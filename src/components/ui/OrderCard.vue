<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Order } from '@/types/order'
import { formatPrice } from '@/utils/format'

interface OrderCardProps {
  order: Order
  currency?: string
}

const props = withDefaults(defineProps<OrderCardProps>(), {
  currency: '₽',
})

defineEmits<{
  repeat: [orderId: string]
}>()

const isExpanded = ref(false)

function toggle() {
  isExpanded.value = !isExpanded.value
}

const statusClass = computed(() => `order-card--${props.order.status}`)
</script>

<template>
  <article class="order-card" :class="statusClass" :aria-label="`Заказ №${order.id}`">
    <!-- Header: clickable row with info grid + chevron -->
    <div class="order-card__header" role="button" tabindex="0" :aria-expanded="isExpanded" @click="toggle" @keydown.enter="toggle" @keydown.space.prevent="toggle">
      <div class="order-card__info-grid">
        <div class="order-card__info">
          <span class="order-card__info-label">Заказ</span>
          <span class="order-card__info-value">№{{ order.id }}</span>
          <span class="order-card__info-sub">{{ order.date }}</span>
        </div>
        <div class="order-card__info">
          <span class="order-card__info-label">Сумма заказа</span>
          <span class="order-card__info-value">{{ formatPrice(order.total) }} {{ currency }}</span>
        </div>
        <div class="order-card__info">
          <span class="order-card__info-label">Статус</span>
          <span class="order-card__info-value order-card__info-value--status">{{ order.statusText }}</span>
        </div>
        <div class="order-card__info">
          <span class="order-card__info-label">Оплачено</span>
          <span class="order-card__info-value">{{ order.paymentMethod }}</span>
        </div>
      </div>

      <span class="order-card__toggle" aria-hidden="true">
        <svg
          class="order-card__chevron"
          :class="{ 'order-card__chevron--open': isExpanded }"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </div>

    <!-- Address + thumbnails (thumbnails visible only when collapsed) -->
    <div class="order-card__address-row">
      <span class="order-card__address">{{ order.address }}</span>

      <div v-if="!isExpanded && order.products.length" class="order-card__thumbnails">
        <div
          v-for="product in order.products"
          :key="product.id"
          class="order-card__thumb"
        >
          <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" class="order-card__thumb-img">
          <span v-else-if="product.emoji" class="order-card__thumb-emoji">{{ product.emoji }}</span>
        </div>
      </div>
    </div>

    <!-- Expanded body: product list + repeat button -->
    <div v-if="isExpanded" class="order-card__body">
      <div class="order-card__products">
        <div
          v-for="product in order.products"
          :key="product.id"
          class="order-card__product"
        >
          <div class="order-card__product-image">
            <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name">
            <span v-else-if="product.emoji">{{ product.emoji }}</span>
          </div>
          <div class="order-card__product-info">
            <span class="order-card__product-name">{{ product.name }}</span>
            <span class="order-card__product-desc">{{ product.description }}</span>
          </div>
          <span class="order-card__product-qty">x{{ product.quantity }}</span>
          <span class="order-card__product-price">{{ formatPrice(product.price) }} {{ currency }}</span>
        </div>
      </div>

      <button class="order-card__repeat" type="button" @click.stop="$emit('repeat', order.id)">
        Повторить заказ
      </button>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.order-card {
  display: flex;
  flex-direction: column;
  gap: $spacing-16;
  padding: $spacing-20 $spacing-24;
  background-color: $color-white;
  border-radius: $radius-xl;
  border-left: 4px solid $color-primary;
  box-shadow: $shadow-sm;

  // ── Status bar colors ──
  &--processing {
    border-left-color: $color-warning;
  }

  &--delivering {
    border-left-color: $color-primary;
  }

  &--completed {
    border-left-color: $color-success;
  }

  &--cancelled {
    border-left-color: $color-text-secondary;
  }

  // ── Header ──
  &__header {
    display: flex;
    align-items: flex-start;
    gap: $spacing-12;
    cursor: pointer;
  }

  &__info-grid {
    flex: 1;
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: $spacing-16;
    min-width: 0;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
    min-width: 0;
  }

  &__info-label {
    font-size: $font-size-xs;
    color: $color-text-secondary;
  }

  &__info-value {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text;
    @include text-truncate;

    &--status {
      // Inherits parent card border color for text — not ideal, use default color
    }
  }

  &__info-sub {
    font-size: $font-size-xs;
    color: $color-text-secondary;
  }

  &__toggle {
    @include flex-center;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    color: $color-text-secondary;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color $transition-fast;

    &:hover {
      background-color: $color-bg;
    }
  }

  &__chevron {
    transition: transform $transition-fast;

    &--open {
      transform: rotate(180deg);
    }
  }

  // ── Address row ──
  &__address-row {
    display: flex;
    align-items: center;
    gap: $spacing-12;
    flex-wrap: wrap;
  }

  &__address {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__thumbnails {
    display: flex;
    gap: $spacing-4;
    margin-left: auto;
  }

  &__thumb {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    background-color: $color-bg;
    @include flex-center;
    flex-shrink: 0;
  }

  &__thumb-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__thumb-emoji {
    font-size: 18px;
    line-height: 1;
  }

  // ── Expanded body ──
  &__body {
    display: flex;
    flex-direction: column;
    gap: $spacing-16;
    border-top: 1px solid $color-border;
    padding-top: $spacing-16;
  }

  &__products {
    display: flex;
    flex-direction: column;
    gap: $spacing-12;
  }

  &__product {
    display: flex;
    align-items: center;
    gap: $spacing-12;
  }

  &__product-image {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    background-color: $color-bg;
    @include flex-center;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    span {
      font-size: 24px;
      line-height: 1;
    }
  }

  &__product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
    min-width: 0;
  }

  &__product-name {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text;
    @include text-truncate;
  }

  &__product-desc {
    font-size: $font-size-xs;
    color: $color-text-secondary;
  }

  &__product-qty {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    flex-shrink: 0;
  }

  &__product-price {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text;
    flex-shrink: 0;
    white-space: nowrap;
  }

  &__repeat {
    align-self: flex-start;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-primary;
    cursor: pointer;
    transition: opacity $transition-fast;

    &:hover {
      opacity: 0.7;
    }
  }

  // ── Responsive ──
  @include media-down($breakpoint-md) {
    &__info-grid {
      grid-template-columns: 1fr 1fr;
      gap: $spacing-12;
    }
  }

  @include media-down($breakpoint-sm) {
    padding: $spacing-16;

    &__info-grid {
      grid-template-columns: 1fr;
      gap: $spacing-8;
    }

    &__product {
      flex-wrap: wrap;
    }

    &__product-info {
      min-width: calc(100% - 60px - $spacing-12);
    }

    &__product-qty,
    &__product-price {
      margin-left: calc(48px + $spacing-12);
    }
  }
}
</style>
