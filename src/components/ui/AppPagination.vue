<script setup lang="ts">
import { computed } from 'vue'

interface AppPaginationProps {
  modelValue: number
  totalPages: number
}

const props = defineProps<AppPaginationProps>()

const emit = defineEmits<{
  'update:modelValue': [page: number]
}>()

/** Build visible page items: numbers and 'dots' placeholders */
const visiblePages = computed((): Array<number | 'dots'> => {
  const total = props.totalPages
  const current = props.modelValue

  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: Array<number | 'dots'> = [1]

  if (current > 3) {
    pages.push('dots')
  }

  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push('dots')
  }

  pages.push(total)

  return pages
})

function goTo(page: number) {
  if (page >= 1 && page <= props.totalPages && page !== props.modelValue) {
    emit('update:modelValue', page)
  }
}

function prev() {
  goTo(props.modelValue - 1)
}

function next() {
  goTo(props.modelValue + 1)
}
</script>

<template>
  <nav class="app-pagination" aria-label="Навигация по страницам">
    <button
      class="app-pagination__arrow"
      :class="{ 'app-pagination__arrow--disabled': modelValue <= 1 }"
      :disabled="modelValue <= 1"
      aria-label="Предыдущая страница"
      @click="prev"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <template v-for="(item, index) in visiblePages" :key="index">
      <span v-if="item === 'dots'" class="app-pagination__ellipsis">...</span>
      <button
        v-else
        class="app-pagination__page"
        :class="{ 'app-pagination__page--active': item === modelValue }"
        :aria-current="item === modelValue ? 'page' : undefined"
        @click="goTo(item)"
      >
        {{ item }}
      </button>
    </template>

    <button
      class="app-pagination__arrow"
      :class="{ 'app-pagination__arrow--disabled': modelValue >= totalPages }"
      :disabled="modelValue >= totalPages"
      aria-label="Следующая страница"
      @click="next"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.app-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-4;

  &__arrow {
    @include flex-center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: $color-primary;
    cursor: pointer;
    transition: background-color $transition-fast, color $transition-fast;

    &:hover:not(:disabled) {
      background-color: $color-primary-light;
    }

    &--disabled {
      color: $color-text-secondary;
      cursor: not-allowed;
      opacity: 0.4;
    }
  }

  &__page {
    @include flex-center;
    min-width: 36px;
    height: 36px;
    padding: 0 $spacing-8;
    border-radius: $radius-md;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text;
    cursor: pointer;
    transition: background-color $transition-fast, color $transition-fast;

    &:hover {
      background-color: $color-bg;
    }

    &--active {
      background-color: $color-primary;
      color: $color-white;
      font-weight: $font-weight-bold;

      &:hover {
        background-color: $color-primary-hover;
      }
    }
  }

  &__ellipsis {
    @include flex-center;
    min-width: 36px;
    height: 36px;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    user-select: none;
  }
}
</style>
