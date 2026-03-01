<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

interface SelectOption {
  label: string
  value: string
}

interface AppSelectProps {
  modelValue: string
  options: SelectOption[]
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<AppSelectProps>(), {
  label: undefined,
  placeholder: undefined,
  error: undefined,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const highlightedIndex = ref(-1)
const triggerRef = ref<HTMLDivElement | null>(null)
const dropdownRef = ref<HTMLUListElement | null>(null)

const selectedLabel = computed(() => {
  const found = props.options.find((opt) => opt.value === props.modelValue)
  return found?.label
})

const wrapperClasses = computed(() => ({
  'app-select__trigger--open': isOpen.value,
  'app-select__trigger--error': !!props.error,
  'app-select__trigger--disabled': props.disabled,
}))

function toggle() {
  if (props.disabled) return
  isOpen.value ? close() : open()
}

function open() {
  isOpen.value = true
  highlightedIndex.value = props.options.findIndex((opt) => opt.value === props.modelValue)
  nextTick(() => {
    scrollToHighlighted()
  })
}

function close() {
  isOpen.value = false
  highlightedIndex.value = -1
}

function select(option: SelectOption) {
  emit('update:modelValue', option.value)
  close()
  triggerRef.value?.focus()
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (isOpen.value && highlightedIndex.value >= 0 && highlightedIndex.value < props.options.length) {
        select(props.options[highlightedIndex.value]!)
      } else {
        toggle()
      }
      break

    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        open()
      } else {
        highlightedIndex.value = Math.min(highlightedIndex.value + 1, props.options.length - 1)
        scrollToHighlighted()
      }
      break

    case 'ArrowUp':
      event.preventDefault()
      if (isOpen.value) {
        highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
        scrollToHighlighted()
      }
      break

    case 'Escape':
      if (isOpen.value) {
        event.preventDefault()
        close()
        triggerRef.value?.focus()
      }
      break

    case 'Tab':
      close()
      break
  }
}

function scrollToHighlighted() {
  if (highlightedIndex.value < 0 || !dropdownRef.value) return
  const items = dropdownRef.value.querySelectorAll('.app-select__option')
  items[highlightedIndex.value]?.scrollIntoView({ block: 'nearest' })
}

function onClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (!triggerRef.value?.parentElement?.contains(target)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onClickOutside)
})
</script>

<template>
  <div class="app-select">
    <label v-if="label" class="app-select__label" @click="toggle">
      {{ label }}
    </label>
    <div class="app-select__container">
      <div
        ref="triggerRef"
        class="app-select__trigger"
        :class="wrapperClasses"
        tabindex="0"
        role="combobox"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        @click="toggle"
        @keydown="onKeydown"
      >
        <span v-if="selectedLabel" class="app-select__value">
          {{ selectedLabel }}
        </span>
        <span v-else class="app-select__placeholder">
          {{ placeholder }}
        </span>
        <svg
          class="app-select__chevron"
          :class="{ 'app-select__chevron--open': isOpen }"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <Transition name="dropdown">
        <ul
          v-if="isOpen"
          ref="dropdownRef"
          class="app-select__dropdown"
          role="listbox"
        >
          <li
            v-for="(option, index) in options"
            :key="option.value"
            class="app-select__option"
            :class="{
              'app-select__option--selected': modelValue === option.value,
              'app-select__option--highlighted': highlightedIndex === index,
            }"
            role="option"
            :aria-selected="modelValue === option.value"
            @click="select(option)"
            @mouseenter="highlightedIndex = index"
          >
            {{ option.label }}
          </li>
        </ul>
      </Transition>
    </div>
    <span v-if="error" class="app-select__error">
      {{ error }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.app-select {
  display: flex;
  flex-direction: column;
  gap: $spacing-8;
  position: relative;

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    cursor: pointer;
  }

  &__container {
    position: relative;
  }

  &__trigger {
    display: flex;
    align-items: center;
    height: 48px;
    padding: 0 $spacing-16;
    background-color: $color-bg;
    border-radius: $radius-lg;
    border: 2px solid transparent;
    cursor: pointer;
    outline: none;
    transition: background-color $transition-fast, border-color $transition-fast;
    gap: $spacing-8;

    &:focus-visible {
      border-color: $color-primary;
      background-color: $color-white;
    }

    &--open {
      background-color: $color-white;
      border-color: $color-primary;
    }

    &--error {
      background-color: $color-white;
      border-color: $color-error;

      .app-select__placeholder {
        color: $color-error;
      }
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__value {
    flex: 1;
    font-size: $font-size-base;
    color: $color-text;
    @include text-truncate;
  }

  &__placeholder {
    flex: 1;
    font-size: $font-size-base;
    color: $color-text-secondary;
  }

  &__chevron {
    flex-shrink: 0;
    color: $color-text-secondary;
    transition: transform $transition-fast;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + $spacing-4);
    left: 0;
    right: 0;
    max-height: 240px;
    overflow-y: auto;
    background-color: $color-white;
    border-radius: $radius-lg;
    box-shadow: $shadow-lg;
    z-index: $z-dropdown;
    padding: $spacing-4;
  }

  &__option {
    padding: $spacing-12 $spacing-16;
    border-radius: $radius-md;
    font-size: $font-size-base;
    color: $color-text;
    cursor: pointer;
    transition: background-color $transition-fast;

    &--highlighted {
      background-color: $color-bg;
    }

    &--selected {
      color: $color-primary;
      font-weight: $font-weight-semibold;
    }
  }

  &__error {
    font-size: $font-size-xs;
    color: $color-error;
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity $transition-fast, transform $transition-fast;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
