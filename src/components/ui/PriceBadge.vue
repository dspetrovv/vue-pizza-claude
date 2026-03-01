<script setup lang="ts">
interface PriceBadgeProps {
  price: number
  prefix?: string
  currency?: string
}

withDefaults(defineProps<PriceBadgeProps>(), {
  prefix: 'от',
  currency: '₽',
})
</script>

<template>
  <span class="price-badge">
    {{ prefix }} {{ price }} {{ currency }}
  </span>
</template>

<style lang="scss" scoped>
.price-badge {
  display: inline-flex;
  align-items: center;
  padding: $spacing-4 $spacing-16;
  border-radius: $radius-full;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  line-height: $line-height-base;
  color: $color-primary;
  background-color: $color-primary-light;
  white-space: nowrap;
}
</style>
