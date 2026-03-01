<script setup lang="ts">
interface ToggleOption {
  label: string
  value: string
}

interface ToggleGroupProps {
  options: ToggleOption[]
  modelValue: string
  ariaLabel?: string
}

withDefaults(defineProps<ToggleGroupProps>(), {
  ariaLabel: undefined,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="toggle-group" role="group" :aria-label="ariaLabel">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="toggle-group__item"
      :class="{ 'toggle-group__item--active': modelValue === option.value }"
      :aria-pressed="modelValue === option.value"
      @click="$emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.toggle-group {
  display: inline-flex;
  background-color: $color-bg-secondary;
  border-radius: $radius-lg;
  padding: $spacing-4;
  gap: $spacing-4;

  &__item {
    padding: $spacing-8 $spacing-20;
    border-radius: $radius-md;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    line-height: $line-height-base;
    color: $color-text;
    background-color: transparent;
    cursor: pointer;
    transition: background-color $transition-fast, color $transition-fast;
    white-space: nowrap;

    &:hover:not(.toggle-group__item--active) {
      background-color: $color-bg;
    }

    &--active {
      background-color: $color-primary;
      color: $color-white;
    }
  }
}
</style>
