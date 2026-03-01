<script setup lang="ts">
interface AppTagProps {
  variant?: 'filled' | 'outline'
  size?: 'sm' | 'md'
}

withDefaults(defineProps<AppTagProps>(), {
  variant: 'filled',
  size: 'sm',
})
</script>

<template>
  <span class="app-tag" :class="[`app-tag--${variant}`, `app-tag--${size}`]">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.app-tag {
  display: inline-flex;
  align-items: center;
  border-radius: $radius-md;
  font-weight: $font-weight-bold;
  line-height: 1;
  white-space: nowrap;
  text-transform: uppercase;

  &--sm {
    padding: $spacing-4 $spacing-8;
    font-size: 10px;
  }

  &--md {
    padding: $spacing-4 $spacing-12;
    font-size: $font-size-xs;
  }

  &--filled {
    background-color: $color-primary;
    color: $color-white;
  }

  &--outline {
    color: $color-text;
    box-shadow: inset 0 0 0 1px $color-border;
  }
}
</style>
