<script setup lang="ts">
interface AppCheckboxProps {
  modelValue: boolean
  label: string
}

defineProps<AppCheckboxProps>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label class="app-checkbox">
    <input
      class="app-checkbox__input"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', !modelValue)"
    >
    <span class="app-checkbox__mark" aria-hidden="true">
      <svg
        class="app-checkbox__icon"
        viewBox="0 0 12 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 5L4.5 8.5L11 1.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="app-checkbox__label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.app-checkbox {
  display: inline-flex;
  align-items: center;
  gap: $spacing-12;
  cursor: pointer;

  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  &__mark {
    width: 20px;
    height: 20px;
    border-radius: $radius-sm;
    border: 2px solid $color-border;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background-color $transition-fast, border-color $transition-fast;
  }

  &__icon {
    width: 12px;
    height: 10px;
    color: $color-white;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity $transition-fast, transform $transition-fast;
  }

  &__input:checked + &__mark {
    background-color: $color-primary;
    border-color: $color-primary;

    .app-checkbox__icon {
      opacity: 1;
      transform: scale(1);
    }
  }

  &__label {
    font-size: $font-size-base;
    line-height: $line-height-base;
    color: $color-text;
  }
}
</style>
