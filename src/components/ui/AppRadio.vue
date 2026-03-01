<script setup lang="ts">
interface AppRadioProps {
  modelValue: string
  value: string
  name: string
  label: string
}

defineProps<AppRadioProps>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label class="app-radio">
    <input
      class="app-radio__input"
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
    >
    <span class="app-radio__mark" />
    <span class="app-radio__label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.app-radio {
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
    border-radius: 50%;
    border: 2px solid $color-border;
    position: relative;
    flex-shrink: 0;
    transition: border-color $transition-fast;

    &::after {
      content: '';
      position: absolute;
      inset: 3px;
      border-radius: 50%;
      background-color: $color-primary;
      transform: scale(0);
      transition: transform $transition-fast;
    }
  }

  &__input:checked + &__mark {
    border-color: $color-primary;

    &::after {
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
