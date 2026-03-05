<script setup lang="ts">
import AppSidebar from '@/components/ui/AppSidebar.vue'
import CartItem from '@/components/ui/CartItem.vue'
import CartSummary from '@/components/ui/CartSummary.vue'
import AppButton from '@/components/ui/AppButton.vue'
import type { CartItemData } from '@/types/cart'

interface OrderSidebarProps {
  modelValue: boolean
  items: CartItemData[]
  currency?: string
}

withDefaults(defineProps<OrderSidebarProps>(), {
  currency: '₽',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:quantity': [id: string | number, quantity: number]
  'remove': [id: string | number]
  'submit': []
  'clear': []
}>()

function onQuantityChange(id: string | number, quantity: number) {
  emit('update:quantity', id, quantity)
}

function computeTotal(items: CartItemData[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}
</script>

<template>
  <AppSidebar
    :model-value="modelValue"
    title="Корзина"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <template #header>
      <span v-if="items.length" class="order-sidebar__count">
        {{ items.length }}
      </span>
    </template>

    <div v-if="items.length" class="order-sidebar__list">
      <CartItem
        v-for="item in items"
        :key="item.id"
        :name="item.name"
        :description="item.description"
        :price="item.price"
        :quantity="item.quantity"
        :image-url="item.imageUrl"
        :emoji="item.emoji"
        :added-ingredients="item.addedIngredients"
        :removed-ingredients="item.removedIngredients"
        :currency="currency"
        @update:quantity="onQuantityChange(item.id, $event)"
        @remove="emit('remove', item.id)"
      />
    </div>

    <div v-else class="order-sidebar__empty">
      <span class="order-sidebar__empty-icon">🛒</span>
      <p class="order-sidebar__empty-text">Корзина пуста</p>
      <p class="order-sidebar__empty-hint">Добавьте товары из каталога</p>
    </div>

    <template v-if="items.length" #footer>
      <div class="order-sidebar__footer">
        <CartSummary
          :total="computeTotal(items)"
          button-label="Оформить заказ"
          :currency="currency"
          @submit="emit('submit')"
        />
        <AppButton
          variant="ghost"
          size="sm"
          class="order-sidebar__clear"
          @click="emit('clear')"
        >
          Очистить корзину
        </AppButton>
      </div>
    </template>
  </AppSidebar>
</template>

<style lang="scss" scoped>
.order-sidebar {
  &__count {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    white-space: nowrap;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-12;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $spacing-40 0;
    gap: $spacing-8;
    text-align: center;
  }

  &__empty-icon {
    font-size: 48px;
    line-height: 1;
    margin-bottom: $spacing-8;
  }

  &__empty-text {
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
    color: $color-text;
  }

  &__empty-hint {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: $spacing-12;
  }

  &__clear {
    align-self: center;
    color: $color-text-secondary;

    &:hover {
      color: $color-error;
    }
  }
}
</style>
