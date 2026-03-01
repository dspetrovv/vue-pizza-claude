import { describe, it, expect, vi } from 'vitest'
import { getOrders, createOrder } from '@/api/orders'
import type { CreateOrderPayload } from '@/api/orders'

describe('getOrders (mock mode)', () => {
  it('returns orders response with required fields', async () => {
    vi.useFakeTimers()
    const promise = getOrders(1)
    vi.runAllTimers()
    const result = await promise
    vi.useRealTimers()

    expect(result).toHaveProperty('orders')
    expect(result).toHaveProperty('hasMore')
    expect(result).toHaveProperty('total')
    expect(Array.isArray(result.orders)).toBe(true)
  })
})

describe('createOrder (mock mode)', () => {
  it('returns orderId', async () => {
    vi.useFakeTimers()
    const payload: CreateOrderPayload = {
      items: [{ id: '1', quantity: 1, price: 499 }],
      customerName: 'Test',
      customerPhone: '+79991234567',
      customerEmail: 'test@test.com',
      deliveryMode: 'delivery',
      address: 'Test address',
      timing: 'asap',
      payment: 'card',
    }
    const promise = createOrder(payload)
    vi.runAllTimers()
    const result = await promise
    vi.useRealTimers()

    expect(result).toHaveProperty('orderId')
    expect(typeof result.orderId).toBe('string')
    expect(result.orderId.length).toBe(4)
  })
})
