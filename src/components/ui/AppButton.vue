<script setup lang="ts">
interface AppButtonProps {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md'
  circle?: boolean
  loading?: boolean
  disabled?: boolean
}

withDefaults(defineProps<AppButtonProps>(), {
  variant: 'primary',
  size: 'md',
  circle: false,
  loading: false,
  disabled: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    class="app-button"
    :class="[
      `app-button--${variant}`,
      `app-button--${size}`,
      {
        'app-button--circle': circle,
        'app-button--loading': loading,
        'app-button--disabled': disabled,
      },
    ]"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="app-button__spinner" aria-hidden="true" />
    <span class="app-button__content" :class="{ 'app-button__content--hidden': loading }">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-8;
  border-radius: $radius-full;
  font-weight: $font-weight-semibold;
  font-size: $font-size-base;
  line-height: 1;
  cursor: pointer;
  transition: background-color $transition-fast, color $transition-fast,
    border-color $transition-fast;
  white-space: nowrap;
  position: relative;

  &--md {
    height: 48px;
    padding: 0 $spacing-32;
  }

  &--sm {
    height: 40px;
    padding: 0 $spacing-24;
    font-size: $font-size-sm;
  }

  &--primary {
    background-color: $color-primary;
    color: $color-white;

    &:hover:not(:disabled) {
      background-color: $color-primary-hover;
    }
  }

  &--outline {
    background-color: transparent;
    color: $color-primary;
    box-shadow: inset 0 0 0 2px $color-primary;

    &:hover:not(:disabled) {
      background-color: $color-primary-light;
    }
  }

  &--ghost {
    background-color: transparent;
    color: $color-text;

    &:hover:not(:disabled) {
      background-color: $color-bg-secondary;
    }
  }

  &--circle {
    width: 48px;
    height: 48px;
    padding: 0;
    border-radius: 50%;

    &.app-button--sm {
      width: 40px;
      height: 40px;
    }
  }

  &--loading {
    cursor: wait;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__spinner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid currentcolor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  &__content {
    display: inline-flex;
    align-items: center;
    gap: $spacing-8;

    &--hidden {
      visibility: hidden;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
