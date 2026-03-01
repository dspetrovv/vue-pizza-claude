<script setup lang="ts">
import CounterInput from '@/components/ui/CounterInput.vue'

interface CartItemProps {
  name: string
  description: string
  price: number
  quantity: number
  imageUrl?: string
  emoji?: string
  currency?: string
}

withDefaults(defineProps<CartItemProps>(), {
  imageUrl: undefined,
  emoji: undefined,
  currency: '₽',
})

defineEmits<{
  'update:quantity': [value: number]
  remove: []
}>()
</script>

<template>
  <div class="cart-item">
    <div class="cart-item__image-wrapper">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="name"
        class="cart-item__image"
      >
      <span v-else-if="emoji" class="cart-item__emoji">{{ emoji }}</span>
    </div>

    <div class="cart-item__body">
      <div class="cart-item__top">
        <div class="cart-item__info">
          <span class="cart-item__name">{{ name }}</span>
          <span class="cart-item__description">{{ description }}</span>
        </div>
        <button class="cart-item__remove" aria-label="Удалить" @click="$emit('remove')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <div class="cart-item__controls">
        <CounterInput
          :model-value="quantity"
          @update:model-value="$emit('update:quantity', $event)"
        />
        <span class="cart-item__price">{{ price }} {{ currency }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: $spacing-16;
  padding: $spacing-16;
  background-color: $color-white;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;

  &__image-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
    background-color: $color-bg;
    @include flex-center;
    flex-shrink: 0;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__emoji {
    font-size: 36px;
    line-height: 1;
  }

  &__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-12;
  }

  &__top {
    display: flex;
    align-items: flex-start;
    gap: $spacing-8;
  }

  &__info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__name {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text;
    @include text-truncate;
  }

  &__description {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__controls {
    @include flex-between;
  }

  &__price {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $color-primary;
    white-space: nowrap;
  }

  &__remove {
    @include flex-center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: $color-text-secondary;
    cursor: pointer;
    flex-shrink: 0;
    transition: background-color $transition-fast, color $transition-fast;

    &:hover {
      background-color: rgba($color-error, 0.1);
      color: $color-error;
    }
  }

  @include media-down($breakpoint-sm) {
    flex-direction: column;
    align-items: stretch;
    text-align: center;

    .cart-item__image-wrapper {
      width: 80px;
      height: 80px;
      align-self: center;
    }

    .cart-item__emoji {
      font-size: 44px;
    }

    .cart-item__info {
      align-items: center;
    }

    .cart-item__name {
      white-space: normal;
      text-align: center;
    }

    .cart-item__controls {
      justify-content: center;
      gap: $spacing-16;
    }
  }
}
</style>
