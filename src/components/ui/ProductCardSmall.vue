<script setup lang="ts">
interface ProductCardSmallProps {
  name: string
  price: number
  portion?: string
  imageUrl?: string
  emoji?: string
  currency?: string
}

withDefaults(defineProps<ProductCardSmallProps>(), {
  portion: undefined,
  imageUrl: undefined,
  emoji: undefined,
  currency: '₽',
})

defineEmits<{
  add: []
}>()
</script>

<template>
  <div class="product-card-small">
    <div class="product-card-small__visual">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="name"
        class="product-card-small__image"
      >
      <span v-else-if="emoji" class="product-card-small__emoji">{{ emoji }}</span>
    </div>

    <span class="product-card-small__name">{{ name }}</span>
    <span v-if="portion" class="product-card-small__portion">{{ portion }}</span>

    <button class="product-card-small__price-btn" @click="$emit('add')">
      {{ price }} {{ currency }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.product-card-small {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-8;
  padding: $spacing-16;
  background-color: $color-white;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;
  text-align: center;

  &__visual {
    width: 100px;
    height: 100px;
    @include flex-center;
    flex-shrink: 0;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__emoji {
    font-size: 64px;
    line-height: 1;
  }

  &__name {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text;
    @include line-clamp(2);
  }

  &__portion {
    font-size: $font-size-xs;
    color: $color-text-secondary;
  }

  &__price-btn {
    margin-top: auto;
    padding: $spacing-8 $spacing-24;
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
