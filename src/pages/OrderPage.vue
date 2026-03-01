<script setup lang="ts">
import { ref, shallowRef, computed, reactive, onMounted } from 'vue'
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
import { formatPrice } from '@/utils/format'
import { usePhoneMask } from '@/composables/usePhoneMask'
import { getTimeSlots, getSuggestions } from '@/api/checkout'
import { createOrder } from '@/api/orders'
import type { TimeOption, SuggestionProduct } from '@/types/checkout'

const router = useRouter()
const cart = useCartStore()

// ── Promo ──
const promo = ref('')

// ── About you ──
const customerName = ref('')
const { formatted: phoneFormatted, onInput: phoneOnInput, isComplete: phoneIsComplete } = usePhoneMask()
const customerEmail = ref('')

// ── Touched state ──
const touched = reactive({
  name: false,
  phone: false,
  email: false,
})

// ── Validation ──
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const nameError = computed(() => {
  if (!touched.name) return undefined
  if (!customerName.value.trim()) return 'Заполните это поле'
  return undefined
})

const phoneError = computed(() => {
  if (!touched.phone) return undefined
  if (!phoneFormatted.value) return 'Заполните это поле'
  if (!phoneIsComplete.value) return 'Введите номер полностью'
  return undefined
})

const emailError = computed(() => {
  if (!touched.email) return undefined
  if (!customerEmail.value.trim()) return 'Заполните это поле'
  if (!EMAIL_RE.test(customerEmail.value.trim())) return 'Некорректный формат почты'
  return undefined
})

// ── Digits-only filter ──
function onDigitsOnly(setter: (v: string) => void) {
  return (value: string | number) => {
    const digits = String(value).replace(/\D/g, '')
    // Remove leading zeros
    const cleaned = digits.replace(/^0+/, '')
    setter(cleaned)
  }
}

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

const timeOptions = ref<TimeOption[]>([])
const suggestions = ref<SuggestionProduct[]>([])

onMounted(async () => {
  const [times, sugg] = await Promise.all([getTimeSlots(), getSuggestions()])
  timeOptions.value = times
  suggestions.value = sugg
})

// ── Payment ──
const payment = ref('cash')

// ── Change (for cash) ──
const changeMode = ref('none')
const changeAmount = ref('')

const handleChangeAmount = onDigitsOnly((v) => { changeAmount.value = v })

// ── Comment ──
const orderComment = ref('')

function goBack() {
  router.push('/')
}

async function submitOrder() {
  await createOrder({
    items: cart.items.map(i => ({ id: i.id, quantity: i.quantity, price: i.price })),
    customerName: customerName.value,
    customerPhone: phoneFormatted.value,
    customerEmail: customerEmail.value,
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
            <div class="order-page__about-row">
              <AppInput
                v-model="customerName"
                label="Имя*"
                placeholder="Имя"
                :error="nameError"
                @blur="touched.name = true"
              />
              <AppInput
                :model-value="phoneFormatted"
                label="Номер телефона*"
                placeholder="+7 (___) ___-__-__"
                type="tel"
                digits-only
                :max-length="18"
                :error="phoneError"
                @update:model-value="phoneOnInput"
                @blur="touched.phone = true"
              />
              <AppInput
                v-model="customerEmail"
                label="Почта*"
                placeholder="Почта"
                type="email"
                :error="emailError"
                @blur="touched.email = true"
              />
            </div>
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
              <AppInput v-model="scheduledDate" placeholder="Дата" type="date" />
              <AppSelect v-model="scheduledTime" placeholder="Время" :options="timeOptions" />
            </div>
          </div>

          <hr class="order-page__divider">

          <!-- Оплата -->
          <div class="order-page__checkout-section">
            <h3 class="order-page__checkout-heading">Оплата</h3>
            <div class="order-page__radio-row">
              <AppRadio v-model="payment" value="cash" name="payment" label="Наличными" />
              <AppRadio v-model="payment" value="card" name="payment" label="Картой" />
              <AppRadio v-model="payment" value="apple-pay" name="payment" label="Apple Pay" />
            </div>
          </div>

          <!-- Сдача (only for cash) -->
          <template v-if="payment === 'cash'">
            <hr class="order-page__divider">

            <div class="order-page__checkout-section">
              <h3 class="order-page__checkout-heading">Сдача</h3>
              <div class="order-page__radio-row">
                <AppRadio v-model="changeMode" value="none" name="change" label="Без сдачи" />
                <div class="order-page__change-with">
                  <AppRadio v-model="changeMode" value="with" name="change" label="Сдача с" />
                  <AppInput
                    :model-value="changeAmount"
                    placeholder="1 000"
                    suffix="₽"
                    digits-only
                    class="order-page__change-input"
                    @update:model-value="handleChangeAmount"
                  />
                </div>
              </div>
            </div>
          </template>

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
          <AppButton variant="primary" class="order-page__footer-btn" @click="submitOrder">
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

  // About row (3 columns)
  &__about-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: $spacing-12;

    @include media-down($breakpoint-md) {
      grid-template-columns: 1fr;
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

  // Change: radio + inline input
  &__change-with {
    display: flex;
    align-items: center;
    gap: $spacing-12;
  }

  &__change-input {
    width: 120px;
    flex-shrink: 0;
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
