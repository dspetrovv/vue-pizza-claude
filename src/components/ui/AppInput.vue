<script setup lang="ts">
import { computed, ref } from 'vue'

const inputId = `app-input-${Math.random().toString(36).slice(2, 9)}`
const errorId = `${inputId}-error`

interface AppInputProps {
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: 'text' | 'number' | 'date' | 'time' | 'email' | 'tel' | 'password'
  error?: string
  disabled?: boolean
  suffix?: string
  digitsOnly?: boolean
  maxLength?: number
  min?: string
}

const props = withDefaults(defineProps<AppInputProps>(), {
  label: undefined,
  placeholder: undefined,
  type: 'text',
  error: undefined,
  disabled: false,
  suffix: undefined,
  digitsOnly: false,
  maxLength: undefined,
  min: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: []
}>()

const isFocused = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const wrapperClasses = computed(() => ({
  'app-input__wrapper--focused': isFocused.value,
  'app-input__wrapper--error': !!props.error,
  'app-input__wrapper--disabled': props.disabled,
}))

/** Block non-digit keys when digitsOnly is enabled */
function onKeydown(e: KeyboardEvent) {
  if (!props.digitsOnly) return
  // Allow navigation / control keys
  const allowed = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End']
  if (allowed.includes(e.key)) return
  // Allow Ctrl/Cmd combos (copy, paste, select all)
  if (e.ctrlKey || e.metaKey) return
  // Block non-digit
  if (!/^\d$/.test(e.key)) {
    e.preventDefault()
    return
  }
  // Block if maxLength reached
  if (props.maxLength !== undefined) {
    const el = inputRef.value
    if (el) {
      const currentDigits = String(el.value).replace(/\D/g, '')
      if (currentDigits.length >= props.maxLength && el.selectionStart === el.selectionEnd) {
        e.preventDefault()
      }
    }
  }
}

/** Strip non-digits from pasted text */
function onPaste(e: ClipboardEvent) {
  if (!props.digitsOnly) return
  e.preventDefault()
  const paste = e.clipboardData?.getData('text') ?? ''
  const digits = paste.replace(/\D/g, '')
  if (!digits) return
  emit('update:modelValue', digits)
}
</script>

<template>
  <div class="app-input">
    <label v-if="label" class="app-input__label" :for="inputId">
      {{ label }}
    </label>
    <div class="app-input__wrapper" :class="wrapperClasses">
      <span v-if="$slots.prefix" class="app-input__prefix">
        <slot name="prefix" />
      </span>
      <input
        :id="inputId"
        ref="inputRef"
        class="app-input__field"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="min"
        :inputmode="digitsOnly ? 'numeric' : undefined"
        :aria-invalid="error ? true : undefined"
        :aria-describedby="error ? errorId : undefined"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @keydown="onKeydown"
        @paste="onPaste"
        @focus="isFocused = true"
        @blur="isFocused = false; emit('blur')"
      >
      <span v-if="suffix" class="app-input__suffix">
        {{ suffix }}
      </span>
      <span v-if="$slots.action" class="app-input__action">
        <slot name="action" />
      </span>
    </div>
    <span v-if="error" :id="errorId" class="app-input__error" role="alert">
      {{ error }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.app-input {
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
    display: flex;
    align-items: center;
    height: 48px;
    padding: 0 $spacing-16;
    background-color: $color-bg;
    border-radius: $radius-lg;
    border: 2px solid transparent;
    transition: background-color $transition-fast, border-color $transition-fast;
    gap: $spacing-8;

    &--focused {
      background-color: $color-white;
      border-color: $color-primary;
    }

    &--error {
      background-color: $color-white;
      border-color: $color-error;

      .app-input__field::placeholder {
        color: $color-error;
      }
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__prefix {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: $color-text-secondary;
  }

  &__field {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: none;
    background: none;
    outline: none;
    font-size: $font-size-base;
    color: $color-text;

    &::placeholder {
      color: $color-text-secondary;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__suffix {
    flex-shrink: 0;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
  }

  &__action {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: -#{$spacing-12};
  }

  &__error {
    font-size: $font-size-xs;
    color: $color-error;
  }
}
</style>
