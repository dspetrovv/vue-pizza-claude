<script setup lang="ts">
interface CategoryButtonProps {
  label: string
  imageUrl?: string
  emoji?: string
  active?: boolean
}

withDefaults(defineProps<CategoryButtonProps>(), {
  imageUrl: undefined,
  emoji: undefined,
  active: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    class="category-button"
    :class="{ 'category-button--active': active }"
    @click="$emit('click', $event)"
  >
    <span class="category-button__icon">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="label"
        class="category-button__image"
      >
      <span v-else-if="emoji" class="category-button__emoji">{{ emoji }}</span>
    </span>
    <span class="category-button__label">{{ label }}</span>
  </button>
</template>

<style lang="scss" scoped>
.category-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-8;
  padding: $spacing-16 $spacing-24;
  background-color: $color-white;
  border-radius: $radius-xl;
  border: 1px solid $color-border;
  cursor: pointer;
  transition: border-color $transition-fast, color $transition-fast;
  min-width: 96px;

  &:hover {
    border-color: $color-primary;
  }

  &--active {
    border-color: $color-primary;
    color: $color-primary;

    .category-button__label {
      color: $color-primary;
    }
  }

  &__icon {
    @include flex-center;
    width: 40px;
    height: 40px;
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

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text;
    white-space: nowrap;
    transition: color $transition-fast;
  }
}
</style>
