<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import { getRestaurants } from '@/api/checkout'
import type { Restaurant } from '@/types/checkout'

const restaurant = ref('')
const restaurantOptions = ref<Restaurant[]>([])

onMounted(async () => {
  restaurantOptions.value = await getRestaurants()
})
</script>

<template>
  <div class="pickup-form">
    <AppSelect
      v-model="restaurant"
      label="Ресторан*"
      placeholder="Выберите ресторан"
      :options="restaurantOptions"
    />
  </div>
</template>

<style lang="scss" scoped>
.pickup-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-16;
}
</style>
