<script setup lang="ts">
interface CartSummaryProps {
  total: number
  weight?: string
  buttonLabel?: string
  currency?: string
}

withDefaults(defineProps<CartSummaryProps>(), {
  weight: undefined,
  buttonLabel: 'В корзину',
  currency: '₽',
})

defineEmits<{
  submit: []
}>()
</script>

<template>
  <div class="cart-summary">
    <div class="cart-summary__info">
      <span class="cart-summary__total">Итого: {{ total }} {{ currency }}</span>
      <span v-if="weight" class="cart-summary__weight">{{ weight }}</span>
    </div>
    <button class="cart-summary__button" @click="$emit('submit')">
      {{ buttonLabel }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.cart-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-16;
  padding: $spacing-20 $spacing-24;
  background-color: $color-white;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;

  &__info {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__total {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $color-primary;
  }

  &__weight {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__button {
    height: 40px;
    padding: 0 $spacing-24;
    background-color: $color-primary;
    color: $color-white;
    border-radius: $radius-full;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    line-height: 1;
    cursor: pointer;
    transition: background-color $transition-fast;
    white-space: nowrap;

    &:hover {
      background-color: $color-primary-hover;
    }
  }
}
</style>
