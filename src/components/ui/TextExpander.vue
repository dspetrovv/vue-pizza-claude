<script setup lang="ts">
import { ref } from 'vue'

interface TextExpanderProps {
  title?: string
  collapsedHeight?: number
}

withDefaults(defineProps<TextExpanderProps>(), {
  title: '',
  collapsedHeight: 120,
})

const isExpanded = ref(false)

function toggle() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="text-expander">
    <h2 v-if="title" class="text-expander__title">{{ title }}</h2>

    <div
      class="text-expander__body"
      :class="{ 'text-expander__body--collapsed': !isExpanded }"
      :style="!isExpanded ? { maxHeight: collapsedHeight + 'px' } : undefined"
    >
      <slot />
    </div>

    <button type="button" class="text-expander__toggle" :aria-expanded="isExpanded" @click="toggle">
      {{ isExpanded ? 'Скрыть' : 'Показать полностью' }}
      <svg
        class="text-expander__chevron"
        :class="{ 'text-expander__chevron--up': isExpanded }"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 5.25L7 8.75L10.5 5.25"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.text-expander {
  display: flex;
  flex-direction: column;
  gap: $spacing-16;

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text;
  }

  &__body {
    font-size: $font-size-sm;
    line-height: $line-height-loose;
    color: $color-text-secondary;
    overflow: hidden;
    transition: max-height $transition-base;

    &--collapsed {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: linear-gradient(to bottom, transparent, $color-bg);
        pointer-events: none;
      }
    }

    :deep(p) {
      margin: 0 0 $spacing-12;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__toggle {
    display: inline-flex;
    align-items: center;
    gap: $spacing-4;
    align-self: flex-start;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-primary;
    cursor: pointer;
    transition: opacity $transition-fast;

    &:hover {
      opacity: 0.8;
    }
  }

  &__chevron {
    flex-shrink: 0;
    transition: transform $transition-fast;

    &--up {
      transform: rotate(180deg);
    }
  }
}
</style>
