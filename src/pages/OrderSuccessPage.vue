<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()

const orderNumber = computed(() => {
  return Math.floor(1000 + Math.random() * 9000)
})

function goHome() {
  router.push('/')
}
</script>

<template>
  <main class="order-success">
    <div class="order-success__card">
      <div class="order-success__icon" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" fill="#4CAF50" />
          <path
            d="M15 24.5L21 30.5L33 18.5"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <h1 class="order-success__title">Ваш заказ принят!</h1>

      <p class="order-success__order-number">Заказ #{{ orderNumber }}</p>

      <p class="order-success__description">
        Ожидайте доставку в течение 60 минут
      </p>

      <AppButton variant="primary" class="order-success__btn" @click="goHome">
        Вернуться на главную
      </AppButton>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.order-success {
  @include container;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px - 200px);
  padding-top: $spacing-64;
  padding-bottom: $spacing-64;

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-16;
    padding: $spacing-48 $spacing-40;
    background-color: $color-white;
    border-radius: $radius-xl;
    box-shadow: $shadow-md;
    text-align: center;
    max-width: 480px;
    width: 100%;
  }

  &__icon {
    margin-bottom: $spacing-8;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text;
  }

  &__order-number {
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
    color: $color-text-secondary;
  }

  &__description {
    font-size: $font-size-base;
    color: $color-text-secondary;
    margin-bottom: $spacing-8;
  }

  &__btn {
    min-width: 220px;
  }

  @include media-down($breakpoint-sm) {
    &__card {
      padding: $spacing-32 $spacing-24;
    }

    &__title {
      font-size: $font-size-lg;
    }
  }
}
</style>
