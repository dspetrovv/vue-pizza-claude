import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItemData } from '@/types/cart'
import { isMockMode } from '@/config'
import { initialCartItems } from '@/data/cart'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItemData[]>(
    isMockMode() ? initialCartItems.map((item) => ({ ...item })) : [],
  )

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  const count = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  function updateQuantity(id: string | number, quantity: number) {
    const item = items.value.find((i) => i.id === id)
    if (item) {
      item.quantity = quantity
    }
  }

  function removeItem(id: string | number) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function addItem(item: CartItemData) {
    const existing = items.value.find((i) => i.id === item.id)
    if (existing) {
      existing.quantity += item.quantity
    } else {
      items.value.push({ ...item })
    }
  }

  function clear() {
    items.value = []
  }

  return {
    items,
    total,
    count,
    updateQuantity,
    removeItem,
    addItem,
    clear,
  }
})
