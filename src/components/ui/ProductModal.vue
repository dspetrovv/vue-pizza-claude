<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import ToggleGroup from '@/components/ui/ToggleGroup.vue'
import IngredientCard from '@/components/ui/IngredientCard.vue'
import AppTag from '@/components/ui/AppTag.vue'
import type { IngredientItem, AddonItem, ProductConfig } from '@/types/product'

interface ToggleOption {
  label: string
  value: string
}

interface ProductModalProps {
  modelValue: boolean
  name: string
  imageUrl?: string
  emoji?: string
  tag?: string
  basePrice: number
  weight?: string
  ingredients?: IngredientItem[]
  doughOptions?: ToggleOption[]
  sizeOptions?: ToggleOption[]
  addons?: AddonItem[]
  currency?: string
}

const props = withDefaults(defineProps<ProductModalProps>(), {
  imageUrl: undefined,
  emoji: undefined,
  tag: undefined,
  weight: undefined,
  ingredients: () => [],
  doughOptions: () => [],
  sizeOptions: () => [],
  addons: () => [],
  currency: '₽',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'add': [config: ProductConfig]
}>()

// ── Internal state ──
const selectedDough = ref(props.doughOptions[0]?.value ?? '')
const selectedSize = ref(props.sizeOptions[0]?.value ?? '')
const removedIngredients = reactive(new Set<string | number>())
const selectedAddons = reactive(new Set<string | number>())

// Reset state when modal opens
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    selectedDough.value = props.doughOptions[0]?.value ?? ''
    selectedSize.value = props.sizeOptions[0]?.value ?? ''
    removedIngredients.clear()
    selectedAddons.clear()
  }
})

// ── Toggles ──
function toggleIngredient(id: string | number) {
  if (removedIngredients.has(id)) {
    removedIngredients.delete(id)
  } else {
    removedIngredients.add(id)
  }
}

function toggleAddon(id: string | number) {
  if (selectedAddons.has(id)) {
    selectedAddons.delete(id)
  } else {
    selectedAddons.add(id)
  }
}

// ── Computed ──
const totalPrice = computed(() => {
  let total = props.basePrice
  for (const addon of props.addons) {
    if (selectedAddons.has(addon.id)) {
      total += addon.price
    }
  }
  return total
})

// ── Actions ──
function close() {
  emit('update:modelValue', false)
}

function handleAdd() {
  emit('add', {
    dough: selectedDough.value,
    size: selectedSize.value,
    removedIngredients: [...removedIngredients],
    selectedAddons: [...selectedAddons],
    totalPrice: totalPrice.value,
  })
  close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="product-modal">
      <div v-if="modelValue" class="product-modal-overlay" @mousedown.self="close" @keydown.escape="close">
        <div class="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
          <!-- Close -->
          <button type="button" class="product-modal__close" aria-label="Закрыть" @click="close">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <!-- Image Section -->
          <div class="product-modal__image-section">
            <AppTag
              v-if="tag"
              variant="filled"
              size="md"
              class="product-modal__tag"
            >
              {{ tag }}
            </AppTag>
            <img
              v-if="imageUrl"
              :src="imageUrl"
              :alt="name"
              class="product-modal__image"
            >
            <span v-else-if="emoji" class="product-modal__emoji">{{ emoji }}</span>
          </div>

          <!-- Content Section -->
          <div class="product-modal__content">
            <div class="product-modal__body">
              <!-- Title -->
              <h2 id="product-modal-title" class="product-modal__name">{{ name }}</h2>

              <!-- Base ingredients -->
              <div v-if="ingredients.length" class="product-modal__ingredients" role="group" aria-label="Ингредиенты">
                <IngredientCard
                  v-for="item in ingredients"
                  :key="item.id"
                  :name="item.name"
                  :image-url="item.imageUrl"
                  :emoji="item.emoji"
                  :selected="!removedIngredients.has(item.id)"
                  variant="base"
                  @toggle="toggleIngredient(item.id)"
                />
              </div>

              <!-- Dough type -->
              <div v-if="doughOptions.length" class="product-modal__option">
                <ToggleGroup v-model="selectedDough" :options="doughOptions" aria-label="Тесто" />
              </div>

              <!-- Size -->
              <div v-if="sizeOptions.length" class="product-modal__option">
                <ToggleGroup v-model="selectedSize" :options="sizeOptions" aria-label="Размер" />
              </div>

              <!-- Addons -->
              <div v-if="addons.length" class="product-modal__addons">
                <h3 class="product-modal__section-title">Добавьте в пиццу</h3>
                <div class="product-modal__addons-grid">
                  <IngredientCard
                    v-for="item in addons"
                    :key="item.id"
                    :name="item.name"
                    :price="item.price"
                    :image-url="item.imageUrl"
                    :emoji="item.emoji"
                    :selected="selectedAddons.has(item.id)"
                    variant="addon"
                    :currency="currency"
                    @toggle="toggleAddon(item.id)"
                  />
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="product-modal__footer">
              <div class="product-modal__total">
                <span class="product-modal__total-price">
                  Итого: {{ totalPrice }} {{ currency }}
                </span>
                <span v-if="weight" class="product-modal__total-weight">
                  {{ weight }}
                </span>
              </div>
              <button class="product-modal__add-btn" @click="handleAdd">
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.product-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($color-black, 0.3);
  backdrop-filter: blur(4px);
  padding: $spacing-16;
}

.product-modal {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 920px;
  max-height: 90vh;
  background-color: $color-white;
  border-radius: $radius-xl;
  box-shadow: $shadow-lg;
  overflow: hidden;

  // ── Close ──
  &__close {
    position: absolute;
    top: $spacing-12;
    right: $spacing-12;
    z-index: 2;
    @include flex-center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba($color-white, 0.85);
    color: $color-text-secondary;
    cursor: pointer;
    transition: background-color $transition-fast, color $transition-fast;

    &:hover {
      background-color: $color-white;
      color: $color-text;
    }
  }

  // ── Image ──
  &__image-section {
    position: relative;
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $color-bg;
    flex-shrink: 0;
  }

  &__tag {
    position: absolute;
    top: $spacing-16;
    left: $spacing-16;
    z-index: 1;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__emoji {
    font-size: 120px;
    line-height: 1;
  }

  // ── Content ──
  &__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: $spacing-24;
    display: flex;
    flex-direction: column;
    gap: $spacing-20;
  }

  &__name {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text;
    line-height: $line-height-tight;
  }

  // ── Ingredients grid ──
  &__ingredients {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-8;
  }

  // ── Toggle options ──
  &__option {
    display: flex;
  }

  // ── Addons ──
  &__addons {
    display: flex;
    flex-direction: column;
    gap: $spacing-12;
  }

  &__section-title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text;
  }

  &__addons-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-8;
  }

  // ── Footer ──
  &__footer {
    @include flex-between;
    padding: $spacing-16 $spacing-24;
    border-top: 1px solid $color-border;
    flex-shrink: 0;
  }

  &__total {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__total-price {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $color-primary;
  }

  &__total-weight {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__add-btn {
    height: 44px;
    padding: 0 $spacing-32;
    background-color: $color-primary;
    color: $color-white;
    border-radius: $radius-full;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    cursor: pointer;
    transition: background-color $transition-fast;
    white-space: nowrap;

    &:hover {
      background-color: $color-primary-hover;
    }
  }

  // ── Responsive ──
  @include media-down($breakpoint-md) {
    flex-direction: column;
    max-height: 95vh;

    .product-modal__image-section {
      width: 100%;
      height: 220px;
      flex-shrink: 0;
    }

    .product-modal__emoji {
      font-size: 80px;
    }

    .product-modal__ingredients {
      grid-template-columns: repeat(3, 1fr);
    }

    .product-modal__addons-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @include media-down($breakpoint-sm) {
    .product-modal__ingredients {
      grid-template-columns: repeat(2, 1fr);
    }

    .product-modal__addons-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .product-modal__footer {
      flex-direction: column;
      gap: $spacing-12;
    }

    .product-modal__add-btn {
      width: 100%;
    }
  }
}

// ── Transitions ──
.product-modal-enter-active,
.product-modal-leave-active {
  transition: opacity $transition-base, backdrop-filter $transition-base;

  .product-modal {
    transition: transform $transition-base, opacity $transition-base;
  }
}

.product-modal-enter-from,
.product-modal-leave-to {
  opacity: 0;
  backdrop-filter: blur(0);

  .product-modal {
    transform: scale(0.95);
    opacity: 0;
  }
}
</style>
