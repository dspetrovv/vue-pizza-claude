<script setup lang="ts">
interface IngredientCardProps {
  name: string
  imageUrl?: string
  emoji?: string
  price?: number
  selected?: boolean
  variant?: 'base' | 'addon'
  currency?: string
}

withDefaults(defineProps<IngredientCardProps>(), {
  imageUrl: undefined,
  emoji: undefined,
  price: undefined,
  selected: false,
  variant: 'addon',
  currency: '₽',
})

defineEmits<{
  toggle: []
}>()
</script>

<template>
  <button
    type="button"
    class="ingredient-card"
    :class="{
      'ingredient-card--selected': variant === 'addon' && selected,
      'ingredient-card--removed': variant === 'base' && !selected,
      'ingredient-card--included': variant === 'base' && selected,
    }"
    :aria-pressed="selected"
    :aria-label="`${name}${variant === 'addon' ? (selected ? ', добавлено' : '') : (selected ? ', в составе' : ', убрано')}`"
    @click="$emit('toggle')"
  >
    <!-- Check badge (addon selected) -->
    <span
      v-if="variant === 'addon' && selected"
      class="ingredient-card__badge ingredient-card__badge--check"
      aria-hidden="true"
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 5L4 7.5L8 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>

    <!-- Remove badge (base excluded) -->
    <span
      v-else-if="variant === 'base' && !selected"
      class="ingredient-card__badge ingredient-card__badge--remove"
      aria-hidden="true"
    >
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2L2 6M2 2L6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </span>

    <div class="ingredient-card__icon">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="name"
        class="ingredient-card__image"
      >
      <span v-else-if="emoji" class="ingredient-card__emoji">{{ emoji }}</span>
    </div>

    <span class="ingredient-card__name">{{ name }}</span>
    <span v-if="price !== undefined" class="ingredient-card__price">
      {{ price }} {{ currency }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
.ingredient-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-4;
  padding: $spacing-12 $spacing-8;
  background-color: $color-white;
  border: 1.5px solid $color-border;
  border-radius: $radius-lg;
  cursor: pointer;
  transition: border-color $transition-fast, opacity $transition-fast;
  min-width: 0;

  &:hover {
    border-color: $color-text-secondary;
  }

  &--selected {
    border-color: $color-primary;

    &:hover {
      border-color: $color-primary-hover;
    }
  }

  &--removed {
    opacity: 0.5;

    .ingredient-card__name {
      text-decoration: line-through;
      color: $color-text-secondary;
    }
  }

  &--included {
    border-color: $color-border;
  }

  // ── Badge ──
  &__badge {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    @include flex-center;
    z-index: 1;

    &--check {
      background-color: $color-primary;
      color: $color-white;
    }

    &--remove {
      background-color: $color-text-secondary;
      color: $color-white;
    }
  }

  // ── Icon ──
  &__icon {
    @include flex-center;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__emoji {
    font-size: 32px;
    line-height: 1;
  }

  // ── Text ──
  &__name {
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $color-text;
    text-align: center;
    line-height: $line-height-tight;
    @include line-clamp(2);
  }

  &__price {
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-primary;
  }
}
</style>
