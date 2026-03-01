<script setup lang="ts">
interface CounterInputProps {
  modelValue: number
  min?: number
  max?: number
}

const props = withDefaults(defineProps<CounterInputProps>(), {
  min: 1,
  max: 99,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function decrement() {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

function increment() {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}
</script>

<template>
  <div class="counter-input" role="group" aria-label="Количество">
    <button
      type="button"
      class="counter-input__btn"
      :disabled="modelValue <= min"
      aria-label="Уменьшить"
      @click="decrement"
    >
      <svg aria-hidden="true" width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
    <output class="counter-input__value" aria-live="polite">{{ modelValue }}</output>
    <button
      type="button"
      class="counter-input__btn"
      :disabled="modelValue >= max"
      aria-label="Увеличить"
      @click="increment"
    >
      <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1V11M1 6H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.counter-input {
  display: inline-flex;
  align-items: center;
  gap: $spacing-12;

  &__btn {
    @include flex-center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: $color-primary;
    background-color: transparent;
    cursor: pointer;
    transition: background-color $transition-fast;

    &:hover:not(:disabled) {
      background-color: $color-primary-light;
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  &__value {
    min-width: 24px;
    text-align: center;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text;
  }
}
</style>
