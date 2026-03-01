<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'

const address = ref('')
const entrance = ref('')
const floor = ref('')
const apartment = ref('')

const touched = reactive({
  address: false,
  entrance: false,
  floor: false,
  apartment: false,
})

const addressError = computed(() => {
  if (!touched.address) return undefined
  if (!address.value.trim()) return 'Заполните это поле'
  return undefined
})

const entranceError = computed(() => {
  if (!touched.entrance) return undefined
  if (!entrance.value) return 'Заполните это поле'
  return undefined
})

const floorError = computed(() => {
  if (!touched.floor) return undefined
  if (!floor.value) return 'Заполните это поле'
  return undefined
})

const apartmentError = computed(() => {
  if (!touched.apartment) return undefined
  if (!apartment.value) return 'Заполните это поле'
  return undefined
})

/** Filters input to positive digits only (no zeros, no letters) */
function onPositiveDigits(setter: (v: string) => void) {
  return (value: string | number) => {
    const digits = String(value).replace(/\D/g, '')
    const cleaned = digits.replace(/^0+/, '')
    setter(cleaned)
  }
}

const handleEntrance = onPositiveDigits((v) => { entrance.value = v })
const handleFloor = onPositiveDigits((v) => { floor.value = v })
const handleApartment = onPositiveDigits((v) => { apartment.value = v })
</script>

<template>
  <div class="delivery-form">
    <AppInput
      v-model="address"
      label="Адрес*"
      placeholder="Адрес"
      :error="addressError"
      @blur="touched.address = true"
    />

    <div class="delivery-form__row">
      <AppInput
        :model-value="entrance"
        placeholder="Подъезд"
        digits-only
        :error="entranceError"
        @update:model-value="handleEntrance"
        @blur="touched.entrance = true"
      />
      <AppInput
        :model-value="floor"
        placeholder="Этаж"
        digits-only
        :error="floorError"
        @update:model-value="handleFloor"
        @blur="touched.floor = true"
      />
      <AppInput
        :model-value="apartment"
        placeholder="Квартира"
        digits-only
        :error="apartmentError"
        @update:model-value="handleApartment"
        @blur="touched.apartment = true"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.delivery-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-16;

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: $spacing-12;

    @include media-down($breakpoint-sm) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
