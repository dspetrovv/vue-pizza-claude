<script setup lang="ts">
import { computed, ref } from 'vue'

const textareaId = `app-textarea-${Math.random().toString(36).slice(2, 9)}`
const errorId = `${textareaId}-error`

interface AppTextareaProps {
  modelValue: string
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  rows?: number
}

const props = withDefaults(defineProps<AppTextareaProps>(), {
  label: undefined,
  placeholder: undefined,
  error: undefined,
  disabled: false,
  rows: 4,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const isFocused = ref(false)

const wrapperClasses = computed(() => ({
  'app-textarea__wrapper--focused': isFocused.value,
  'app-textarea__wrapper--error': !!props.error,
  'app-textarea__wrapper--disabled': props.disabled,
}))
</script>

<template>
  <div class="app-textarea">
    <label v-if="label" class="app-textarea__label" :for="textareaId">
      {{ label }}
    </label>
    <div class="app-textarea__wrapper" :class="wrapperClasses">
      <textarea
        :id="textareaId"
        class="app-textarea__field"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        :aria-invalid="error ? true : undefined"
        :aria-describedby="error ? errorId : undefined"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>
    <span v-if="error" :id="errorId" class="app-textarea__error" role="alert">
      {{ error }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.app-textarea {
  display: flex;
  flex-direction: column;
  gap: $spacing-8;

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    cursor: pointer;
  }

  &__wrapper {
    background-color: $color-bg;
    border-radius: $radius-lg;
    border: 2px solid transparent;
    transition: background-color $transition-fast, border-color $transition-fast;

    &--focused {
      background-color: $color-white;
      border-color: $color-primary;
    }

    &--error {
      background-color: $color-white;
      border-color: $color-error;

      .app-textarea__field::placeholder {
        color: $color-error;
      }
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__field {
    display: block;
    width: 100%;
    padding: $spacing-12 $spacing-16;
    border: none;
    background: none;
    outline: none;
    font-size: $font-size-base;
    color: $color-text;
    resize: vertical;
    line-height: $line-height-base;
    font-family: inherit;

    &::placeholder {
      color: $color-text-secondary;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__error {
    font-size: $font-size-xs;
    color: $color-error;
  }
}
</style>
