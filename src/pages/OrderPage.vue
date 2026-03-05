<script setup lang="ts">
import { ref, shallowRef, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CartItem from '@/components/ui/CartItem.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppRadio from '@/components/ui/AppRadio.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppTextarea from '@/components/ui/AppTextarea.vue'
import ProductCardSmall from '@/components/ui/ProductCardSmall.vue'
import AppCarousel from '@/components/ui/AppCarousel.vue'
import DeliveryForm from '@/pages/DeliveryForm.vue'
import PickupForm from '@/pages/PickupForm.vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { formatPrice } from '@/utils/format'
import { getSuggestions } from '@/api/checkout'
import { createOrder } from '@/api/orders'
import type { TimeOption, SuggestionProduct } from '@/types/checkout'

const router = useRouter()
const cart = useCartStore()
const auth = useAuthStore()

// ── Promo ──
const promo = ref('')

// ── Delivery mode ──
const deliveryMode = ref<'delivery' | 'pickup'>('delivery')
const activeForm = shallowRef(DeliveryForm)

function setDeliveryMode(mode: 'delivery' | 'pickup') {
  deliveryMode.value = mode
  activeForm.value = mode === 'delivery' ? DeliveryForm : PickupForm
}

// ── Timing ──
const timing = ref('asap')
const scheduledDate = ref('')
const scheduledTime = ref('')

const suggestions = ref<SuggestionProduct[]>([])

onMounted(async () => {
  suggestions.value = await getSuggestions()
})

// ── Dynamic time slots ──
function padZero(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

function getTodayString(): string {
  const d = new Date()
  return `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}`
}

const minDate = computed(() => getTodayString())

const availableTimeSlots = computed<TimeOption[]>(() => {
  const CLOSE_HOUR = 21
  const OPEN_HOUR = 10
  const slots: TimeOption[] = []

  const now = new Date()
  const isToday = scheduledDate.value === getTodayString()

  let startHour = OPEN_HOUR
  let startMinute = 0

  if (isToday) {
    // Earliest = now + 1 hour, rounded up to next :00 or :30
    const earliest = new Date(now.getTime() + 60 * 60 * 1000)
    startHour = earliest.getHours()
    startMinute = earliest.getMinutes()

    // Round up to next :00 or :30
    if (startMinute > 30) {
      startHour += 1
      startMinute = 0
    } else if (startMinute > 0) {
      startMinute = 30
    }
  }

  for (let h = startHour; h <= CLOSE_HOUR; h++) {
    const minStart = (h === startHour) ? startMinute : 0
    for (const m of [0, 30]) {
      if (m < minStart) continue
      if (h === CLOSE_HOUR && m > 0) continue
      const label = `${padZero(h)}:${padZero(m)}`
      slots.push({ label, value: label })
    }
  }

  return slots
})

// Reset time when date changes or slots become unavailable
watch([scheduledDate, availableTimeSlots], () => {
  if (scheduledTime.value && !availableTimeSlots.value.some(s => s.value === scheduledTime.value)) {
    scheduledTime.value = ''
  }
})

// ── Payment ──
const payment = ref('cash')

// ── Comment ──
const orderComment = ref('')

// ── Submit logic ──
const isSubmitDisabled = computed(() => {
  if (!auth.hasCompleteProfile) return true
  if (timing.value === 'scheduled' && (!scheduledDate.value || !scheduledTime.value)) return true
  return false
})

function goBack() {
  router.push('/')
}

async function submitOrder() {
  if (isSubmitDisabled.value) return
  await createOrder({
    items: cart.items.map(i => ({ id: i.id, quantity: i.quantity, price: i.price })),
    customerName: auth.user!.name,
    customerPhone: auth.user!.phone,
    customerEmail: auth.user!.email,
    deliveryMode: deliveryMode.value,
    timing: timing.value as 'asap' | 'scheduled',
    scheduledDate: scheduledDate.value || undefined,
    scheduledTime: scheduledTime.value || undefined,
    payment: payment.value,
    comment: orderComment.value || undefined,
  })
  cart.clear()
  router.push('/order-success')
}
</script>

<template>
  <main class="order-page">
    <div class="order-page__container">
      <!-- Back + Title -->
      <div class="order-page__header">
        <button class="order-page__back" @click="goBack">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <h1 class="order-page__title">Ваш заказ</h1>
      </div>

      <!-- Empty state -->
      <div v-if="!cart.items.length" class="order-page__empty">
        <span class="order-page__empty-icon">🛒</span>
        <p class="order-page__empty-text">Корзина пуста</p>
        <p class="order-page__empty-hint">Добавьте товары из каталога</p>
        <AppButton @click="goBack">Перейти в каталог</AppButton>
      </div>

      <template v-else>
        <!-- Cart items -->
        <div class="order-page__items">
          <CartItem
            v-for="item in cart.items"
            :key="item.id"
            :name="item.name"
            :description="item.description"
            :price="item.price"
            :quantity="item.quantity"
            :image-url="item.imageUrl"
            :emoji="item.emoji"
            :added-ingredients="item.addedIngredients"
            :removed-ingredients="item.removedIngredients"
            @update:quantity="cart.updateQuantity(item.id, $event)"
            @remove="cart.removeItem(item.id)"
          />
        </div>

        <!-- Promo + Total -->
        <div class="order-page__summary">
          <div class="order-page__promo">
            <AppInput v-model="promo" placeholder="Промокод">
              <template #action>
                <AppButton variant="primary" circle size="sm">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </AppButton>
              </template>
            </AppInput>
          </div>
          <span class="order-page__total">
            Итого: {{ formatPrice(cart.total) }} ₽
          </span>
        </div>

        <!-- Suggestions carousel -->
        <section class="order-page__suggestions">
          <h2 class="order-page__section-title">Добавить к заказу?</h2>
          <AppCarousel>
            <ProductCardSmall
              v-for="item in suggestions"
              :key="item.id"
              :name="item.name"
              :price="item.price"
              :portion="item.portion"
              :emoji="item.emoji"
            />
          </AppCarousel>
        </section>

        <!-- ═══════════════════════════════════ -->
        <!-- Checkout section                    -->
        <!-- ═══════════════════════════════════ -->
        <section class="order-page__checkout">
          <!-- О вас -->
          <div class="order-page__checkout-section">
            <h3 class="order-page__checkout-heading">О вас</h3>
            <div v-if="auth.hasCompleteProfile" class="order-page__about-info">
              <span class="order-page__about-value">{{ auth.user!.name }}</span>
              <span class="order-page__about-value">{{ auth.user!.phone }}</span>
              <span class="order-page__about-value">{{ auth.user!.email }}</span>
            </div>
            <p v-else class="order-page__about-empty">
              Заполните данные в
              <router-link to="/account" class="order-page__about-link">настройках профиля</router-link>
            </p>
          </div>

          <hr class="order-page__divider">

          <!-- Delivery / Pickup toggle + form -->
          <div class="order-page__checkout-section">
            <div class="order-page__mode-toggle">
              <AppButton
                :variant="deliveryMode === 'delivery' ? 'primary' : 'outline'"
                @click="setDeliveryMode('delivery')"
              >
                Доставка
              </AppButton>
              <AppButton
                :variant="deliveryMode === 'pickup' ? 'primary' : 'outline'"
                @click="setDeliveryMode('pickup')"
              >
                Самовывоз
              </AppButton>
            </div>

            <KeepAlive>
              <component :is="activeForm" />
            </KeepAlive>
          </div>

          <hr class="order-page__divider">

          <!-- Когда выполнить заказ? -->
          <div class="order-page__checkout-section">
            <h3 class="order-page__checkout-heading">Когда выполнить заказ?</h3>
            <div class="order-page__radio-row">
              <AppRadio v-model="timing" value="asap" name="timing" label="Как можно скорее" />
              <AppRadio v-model="timing" value="scheduled" name="timing" label="По времени" />
            </div>

            <div v-if="timing === 'scheduled'" class="order-page__scheduled-row">
              <AppInput v-model="scheduledDate" placeholder="Дата" type="date" :min="minDate" />
              <AppSelect
                v-model="scheduledTime"
                placeholder="Время"
                :options="availableTimeSlots"
                :disabled="!scheduledDate"
              />
            </div>
          </div>

          <hr class="order-page__divider">

          <!-- Оплата -->
          <div class="order-page__checkout-section">
            <h3 class="order-page__checkout-heading">Оплата</h3>
            <div class="order-page__radio-row">
              <AppRadio v-model="payment" value="cash" name="payment" label="Наличными" />
              <AppRadio v-model="payment" value="card" name="payment" label="Картой" />
            </div>
          </div>

          <hr class="order-page__divider">

          <!-- Комментарий -->
          <div class="order-page__checkout-section">
            <h3 class="order-page__checkout-heading">Комментарий</h3>
            <AppTextarea v-model="orderComment" placeholder="Есть уточнения?" :rows="3" />
          </div>
        </section>

        <!-- Footer bar: Total + Submit -->
        <div class="order-page__footer">
          <span class="order-page__footer-total">
            Итого: {{ formatPrice(cart.total) }} ₽
          </span>
          <AppButton
            variant="primary"
            class="order-page__footer-btn"
            :disabled="isSubmitDisabled"
            @click="submitOrder"
          >
            Оформить заказ
          </AppButton>
        </div>
      </template>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.order-page {
  @include container;
  padding-top: $spacing-32;
  padding-bottom: $spacing-64;

  &__container {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: $spacing-24;
  }

  // ── Header ──
  &__header {
    display: flex;
    align-items: center;
    gap: $spacing-12;
  }

  &__back {
    @include flex-center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: $color-text;
    cursor: pointer;
    transition: background-color $transition-fast;
    flex-shrink: 0;

    &:hover {
      background-color: $color-bg-secondary;
    }
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text;
  }

  // ── Empty ──
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-12;
    padding: $spacing-64 0;
    text-align: center;
  }

  &__empty-icon {
    font-size: 56px;
    line-height: 1;
    margin-bottom: $spacing-8;
  }

  &__empty-text {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-text;
  }

  &__empty-hint {
    font-size: $font-size-base;
    color: $color-text-secondary;
    margin-bottom: $spacing-8;
  }

  // ── Items ──
  &__items {
    display: flex;
    flex-direction: column;
    gap: $spacing-12;
  }

  // ── Summary ──
  &__summary {
    display: flex;
    align-items: center;
    gap: $spacing-16;
    padding: $spacing-20 $spacing-24;
    background-color: $color-white;
    border-radius: $radius-xl;
    box-shadow: $shadow-sm;
  }

  &__promo {
    flex: 1;
    min-width: 0;
  }

  &__total {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $color-primary;
    white-space: nowrap;
  }

  // ── Suggestions ──
  &__suggestions {
    display: flex;
    flex-direction: column;
    gap: $spacing-16;
    margin-top: $spacing-8;
  }

  &__section-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text;
  }

  // ══════════════════════════
  // Checkout card
  // ══════════════════════════
  &__checkout {
    display: flex;
    flex-direction: column;
    gap: $spacing-20;
    padding: $spacing-24;
    background-color: $color-white;
    border-radius: $radius-xl;
    box-shadow: $shadow-sm;
  }

  &__checkout-section {
    display: flex;
    flex-direction: column;
    gap: $spacing-12;
  }

  &__checkout-heading {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text;
  }

  &__divider {
    border: none;
    border-top: 1px solid $color-border;
    margin: 0;
  }

  // About — profile data display
  &__about-info {
    display: flex;
    gap: $spacing-20;
    flex-wrap: wrap;
  }

  &__about-value {
    font-size: $font-size-base;
    color: $color-text;
  }

  &__about-empty {
    font-size: $font-size-base;
    color: $color-text-secondary;
  }

  &__about-link {
    color: $color-primary;
    text-decoration: none;
    font-weight: $font-weight-medium;

    &:hover {
      text-decoration: underline;
    }
  }

  // Delivery mode toggle
  &__mode-toggle {
    display: flex;
    gap: $spacing-8;

    > * {
      flex: 1;
    }
  }

  // Radio options row
  &__radio-row {
    display: flex;
    gap: $spacing-20;
    flex-wrap: wrap;
    align-items: center;
  }

  // Scheduled date/time row
  &__scheduled-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-12;

    @include media-down($breakpoint-sm) {
      grid-template-columns: 1fr;
    }
  }

  // ══════════════════════════
  // Footer bar
  // ══════════════════════════
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-20 $spacing-24;
    background-color: $color-white;
    border-radius: $radius-xl;
    box-shadow: $shadow-sm;
  }

  &__footer-total {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $color-primary;
    white-space: nowrap;
  }

  &__footer-btn {
    flex-shrink: 0;
  }

  // ── Responsive ──
  @include media-down($breakpoint-sm) {
    &__summary {
      flex-direction: column;
      align-items: stretch;
      gap: $spacing-12;
    }

    &__total {
      text-align: center;
    }

    &__title {
      font-size: $font-size-lg;
    }

    &__checkout {
      padding: $spacing-16;
    }

    &__footer {
      flex-direction: column;
      gap: $spacing-12;
      align-items: stretch;
      text-align: center;
    }
  }
}
</style>
