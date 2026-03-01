<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const trackRef = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
let resizeObserver: ResizeObserver | null = null

function updateScrollState() {
  if (!trackRef.value) return
  const { scrollLeft, scrollWidth, clientWidth } = trackRef.value
  canScrollLeft.value = scrollLeft > 1
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 1
}

function scroll(direction: 'left' | 'right') {
  if (!trackRef.value) return
  const firstChild = trackRef.value.firstElementChild
  if (!firstChild) return
  const cardWidth = firstChild.getBoundingClientRect().width
  const gap = parseFloat(getComputedStyle(trackRef.value).gap) || 0
  const offset = cardWidth + gap
  trackRef.value.scrollBy({
    left: direction === 'right' ? offset : -offset,
    behavior: 'smooth',
  })
}

onMounted(() => {
  if (trackRef.value) {
    updateScrollState()
    resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(trackRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <div class="app-carousel">
    <button
      v-show="canScrollLeft"
      class="app-carousel__btn app-carousel__btn--prev"
      aria-label="Назад"
      @click="scroll('left')"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div
      ref="trackRef"
      class="app-carousel__track"
      @scroll.passive="updateScrollState"
    >
      <slot />
    </div>

    <button
      v-show="canScrollRight"
      class="app-carousel__btn app-carousel__btn--next"
      aria-label="Вперёд"
      @click="scroll('right')"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.app-carousel {
  position: relative;

  &__track {
    display: flex;
    gap: $spacing-16;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    > :deep(*) {
      scroll-snap-align: start;
      flex: 0 0 calc(25% - $spacing-16 * 3 / 4);

      @include media-down($breakpoint-lg) {
        flex: 0 0 calc(33.333% - $spacing-16 * 2 / 3);
      }

      @include media-down($breakpoint-sm) {
        flex: 0 0 calc(50% - $spacing-16 / 2);
      }
    }
  }

  &__btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    @include flex-center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: $color-primary;
    color: $color-white;
    cursor: pointer;
    box-shadow: $shadow-md;
    transition: background-color $transition-fast, transform $transition-fast;

    &:hover {
      background-color: $color-primary-hover;
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }

    &--prev {
      left: -$spacing-20;
    }

    &--next {
      right: -$spacing-20;
    }

    @include media-down($breakpoint-sm) {
      width: 36px;
      height: 36px;

      &--prev {
        left: -$spacing-8;
      }

      &--next {
        right: -$spacing-8;
      }
    }
  }
}
</style>
