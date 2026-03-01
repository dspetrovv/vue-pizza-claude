<script setup lang="ts">
import AppTag from '@/components/ui/AppTag.vue'

interface ProductCardProps {
  name: string
  description: string
  price: number
  pricePrefix?: string
  tag?: string
  imageUrl?: string
  emoji?: string
  currency?: string
}

withDefaults(defineProps<ProductCardProps>(), {
  pricePrefix: 'от',
  tag: undefined,
  imageUrl: undefined,
  emoji: undefined,
  currency: '₽',
})

defineEmits<{
  select: []
}>()
</script>

<template>
  <article class="product-card" :aria-label="name">
    <div class="product-card__visual">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="name"
        class="product-card__image"
      >
      <span v-else-if="emoji" class="product-card__emoji" aria-hidden="true">{{ emoji }}</span>
      <AppTag
        v-if="tag"
        class="product-card__tag"
        variant="filled"
        size="sm"
      >
        {{ tag }}
      </AppTag>
    </div>

    <div class="product-card__body">
      <span class="product-card__name">{{ name }}</span>
      <span class="product-card__description">{{ description }}</span>

      <div class="product-card__footer">
        <button type="button" class="product-card__btn" :aria-label="`Выбрать ${name}`" @click="$emit('select')">
          Выбрать
        </button>
        <span class="product-card__price">
          {{ pricePrefix }} {{ price }} {{ currency }}
        </span>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background-color: $color-white;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;
  overflow: hidden;

  &__visual {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    background-color: $color-bg;
    @include flex-center;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__emoji {
    font-size: 80px;
    line-height: 1;
  }

  &__tag {
    position: absolute;
    top: $spacing-12;
    right: $spacing-12;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: $spacing-8;
    padding: $spacing-16;
    flex: 1;
  }

  &__name {
    font-size: $font-size-base;
    font-weight: $font-weight-bold;
    color: $color-text;
  }

  &__description {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    line-height: $line-height-base;
    @include line-clamp(2);
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-12;
    margin-top: auto;
    padding-top: $spacing-8;
  }

  &__btn {
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

  &__price {
    font-size: $font-size-base;
    font-weight: $font-weight-bold;
    color: $color-text;
    white-space: nowrap;
  }
}
</style>
