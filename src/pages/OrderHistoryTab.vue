<script setup lang="ts">
import { ref, onMounted } from 'vue'
import OrderCard from '@/components/ui/OrderCard.vue'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import { getOrders } from '@/api/orders'
import type { Order } from '@/types/order'

const orders = ref<Order[]>([])
const currentPage = ref(0)

async function loadMore() {
  currentPage.value++
  const response = await getOrders(currentPage.value)
  orders.value.push(...response.orders)
  endLoading(!response.hasMore)
}

const { isLoading, isFinished, endLoading } = useInfiniteScroll('sentinel', loadMore)

onMounted(async () => {
  // Initial load
  currentPage.value = 1
  const response = await getOrders(1)
  orders.value = response.orders
  endLoading(!response.hasMore)
})

function handleRepeat(orderId: string) {
  // TODO: add order products to cart
  console.log('Repeat order:', orderId)
}
</script>

<template>
  <div class="order-history">
    <div class="order-history__list">
      <OrderCard
        v-for="order in orders"
        :key="order.id"
        :order="order"
        @repeat="handleRepeat"
      />
    </div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="order-history__loader" role="status" aria-live="polite">
      <span class="order-history__spinner" aria-hidden="true" />
      <span class="order-history__loader-text">Загрузка заказов...</span>
    </div>

    <!-- End of list message -->
    <p v-else-if="isFinished && orders.length" class="order-history__end" role="status" aria-live="polite">
      Все заказы загружены
    </p>

    <!-- Sentinel element for IntersectionObserver -->
    <div ref="sentinel" class="order-history__sentinel" />
  </div>
</template>

<style lang="scss" scoped>
.order-history {
  display: flex;
  flex-direction: column;
  gap: $spacing-24;

  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-16;
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-12;
    padding: $spacing-24 0;
  }

  &__spinner {
    display: block;
    width: 24px;
    height: 24px;
    border: 3px solid $color-border;
    border-top-color: $color-primary;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__loader-text {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__end {
    text-align: center;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    padding: $spacing-16 0;
  }

  &__sentinel {
    height: 1px;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
