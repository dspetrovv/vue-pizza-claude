import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { initialCartItems } from '@/data/cart'

describe('useCartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with mock data in mock mode', () => {
    const cart = useCartStore()
    expect(cart.items.length).toBe(initialCartItems.length)
    expect(cart.items[0]!.name).toBe(initialCartItems[0]!.name)
    expect(cart.total).toBeGreaterThan(0)
    expect(cart.count).toBeGreaterThan(0)
  })

  it('mock items are copies (not references to source array)', () => {
    const cart = useCartStore()
    cart.items[0]!.quantity = 999
    expect(initialCartItems[0]!.quantity).not.toBe(999)
  })

  it('adds an item', () => {
    const cart = useCartStore()
    cart.clear()
    cart.addItem({ id: '1', name: 'Pizza', description: '30cm', price: 499, quantity: 1, emoji: '🍕' })

    expect(cart.items.length).toBe(1)
    expect(cart.items[0]!.name).toBe('Pizza')
    expect(cart.total).toBe(499)
    expect(cart.count).toBe(1)
  })

  it('increments quantity when adding existing item', () => {
    const cart = useCartStore()
    cart.clear()
    cart.addItem({ id: '1', name: 'Pizza', description: '30cm', price: 499, quantity: 1, emoji: '🍕' })
    cart.addItem({ id: '1', name: 'Pizza', description: '30cm', price: 499, quantity: 2, emoji: '🍕' })

    expect(cart.items.length).toBe(1)
    expect(cart.items[0]!.quantity).toBe(3)
    expect(cart.total).toBe(499 * 3)
    expect(cart.count).toBe(3)
  })

  it('adds different items separately', () => {
    const cart = useCartStore()
    cart.clear()
    cart.addItem({ id: '1', name: 'Pizza', description: '30cm', price: 499, quantity: 1 })
    cart.addItem({ id: '2', name: 'Sushi', description: '8 pcs', price: 349, quantity: 2 })

    expect(cart.items.length).toBe(2)
    expect(cart.total).toBe(499 + 349 * 2)
    expect(cart.count).toBe(3)
  })

  it('updates quantity of an item', () => {
    const cart = useCartStore()
    cart.clear()
    cart.addItem({ id: '1', name: 'Pizza', description: '30cm', price: 499, quantity: 1 })
    cart.updateQuantity('1', 5)

    expect(cart.items[0]!.quantity).toBe(5)
    expect(cart.total).toBe(499 * 5)
    expect(cart.count).toBe(5)
  })

  it('updateQuantity does nothing for non-existent item', () => {
    const cart = useCartStore()
    cart.clear()
    cart.addItem({ id: '1', name: 'Pizza', description: '30cm', price: 499, quantity: 1 })
    cart.updateQuantity('999', 5)

    expect(cart.items.length).toBe(1)
    expect(cart.items[0]!.quantity).toBe(1)
  })

  it('removes an item', () => {
    const cart = useCartStore()
    cart.clear()
    cart.addItem({ id: '1', name: 'Pizza', description: '30cm', price: 499, quantity: 1 })
    cart.addItem({ id: '2', name: 'Sushi', description: '8 pcs', price: 349, quantity: 1 })
    cart.removeItem('1')

    expect(cart.items.length).toBe(1)
    expect(cart.items[0]!.id).toBe('2')
    expect(cart.total).toBe(349)
  })

  it('clears all items', () => {
    const cart = useCartStore()
    cart.addItem({ id: '1', name: 'Pizza', description: '30cm', price: 499, quantity: 1 })
    cart.addItem({ id: '2', name: 'Sushi', description: '8 pcs', price: 349, quantity: 1 })
    cart.clear()

    expect(cart.items).toEqual([])
    expect(cart.total).toBe(0)
    expect(cart.count).toBe(0)
  })

  it('addItem creates a copy (does not hold reference)', () => {
    const cart = useCartStore()
    cart.clear()
    const item = { id: '1', name: 'Pizza', description: '30cm', price: 499, quantity: 1 }
    cart.addItem(item)

    // Mutating original should not affect cart
    item.quantity = 99
    expect(cart.items[0]!.quantity).toBe(1)
  })

  it('treats same product with different ingredient modifications as separate items', () => {
    const cart = useCartStore()
    cart.clear()
    cart.addItem({
      id: 'pepperoni-traditional-28',
      name: 'Пепперони',
      description: 'Традиционное тесто, 28 см',
      price: 399,
      quantity: 1,
    })
    cart.addItem({
      id: 'pepperoni-traditional-28-r:tomatoes',
      name: 'Пепперони',
      description: 'Традиционное тесто, 28 см',
      price: 399,
      quantity: 1,
      removedIngredients: ['Томаты'],
    })

    expect(cart.items.length).toBe(2)
    expect(cart.count).toBe(2)
  })

  it('merges identical items with same ingredient modifications', () => {
    const cart = useCartStore()
    cart.clear()
    cart.addItem({
      id: 'pepperoni-traditional-28-r:tomatoes',
      name: 'Пепперони',
      description: 'Традиционное тесто, 28 см',
      price: 399,
      quantity: 1,
      removedIngredients: ['Томаты'],
    })
    cart.addItem({
      id: 'pepperoni-traditional-28-r:tomatoes',
      name: 'Пепперони',
      description: 'Традиционное тесто, 28 см',
      price: 399,
      quantity: 1,
      removedIngredients: ['Томаты'],
    })

    expect(cart.items.length).toBe(1)
    expect(cart.items[0]!.quantity).toBe(2)
  })
})
