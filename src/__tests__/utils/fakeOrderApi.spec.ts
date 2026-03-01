import { describe, it, expect, vi } from 'vitest'
import { fetchOrders } from '@/utils/fakeOrderApi'

describe('fetchOrders', () => {
  it('returns orders array, hasMore flag, and total', async () => {
    vi.useFakeTimers()
    const promise = fetchOrders(1)
    vi.runAllTimers()
    const result = await promise
    vi.useRealTimers()

    expect(result).toHaveProperty('orders')
    expect(result).toHaveProperty('hasMore')
    expect(result).toHaveProperty('total')
    expect(Array.isArray(result.orders)).toBe(true)
    expect(typeof result.hasMore).toBe('boolean')
    expect(typeof result.total).toBe('number')
  })

  it('returns up to 6 orders per page', async () => {
    vi.useFakeTimers()
    const promise = fetchOrders(1)
    vi.runAllTimers()
    const result = await promise
    vi.useRealTimers()

    expect(result.orders.length).toBeLessThanOrEqual(6)
    expect(result.orders.length).toBeGreaterThan(0)
  })

  it('returns deterministic results for the same page', async () => {
    vi.useFakeTimers()
    const p1 = fetchOrders(1)
    vi.runAllTimers()
    const result1 = await p1
    vi.useRealTimers()

    vi.useFakeTimers()
    const p2 = fetchOrders(1)
    vi.runAllTimers()
    const result2 = await p2
    vi.useRealTimers()

    expect(result1.orders.length).toBe(result2.orders.length)
    expect(result1.orders[0]?.id).toBe(result2.orders[0]?.id)
    expect(result1.orders[0]?.total).toBe(result2.orders[0]?.total)
  })

  it('indicates hasMore=false on the last page', async () => {
    vi.useFakeTimers()
    // Total orders = 47, page size = 6 → 8 pages, last page = 8
    const promise = fetchOrders(8)
    vi.runAllTimers()
    const result = await promise
    vi.useRealTimers()

    expect(result.hasMore).toBe(false)
  })

  it('each order has required properties', async () => {
    vi.useFakeTimers()
    const promise = fetchOrders(1)
    vi.runAllTimers()
    const result = await promise
    vi.useRealTimers()

    const order = result.orders[0]!
    expect(order).toHaveProperty('id')
    expect(order).toHaveProperty('date')
    expect(order).toHaveProperty('total')
    expect(order).toHaveProperty('status')
    expect(order).toHaveProperty('statusText')
    expect(order).toHaveProperty('paymentMethod')
    expect(order).toHaveProperty('address')
    expect(order).toHaveProperty('products')
    expect(Array.isArray(order.products)).toBe(true)
    expect(order.products.length).toBeGreaterThan(0)
  })

  it('order products have required properties', async () => {
    vi.useFakeTimers()
    const promise = fetchOrders(1)
    vi.runAllTimers()
    const result = await promise
    vi.useRealTimers()

    const product = result.orders[0]!.products[0]!
    expect(product).toHaveProperty('id')
    expect(product).toHaveProperty('name')
    expect(product).toHaveProperty('description')
    expect(product).toHaveProperty('price')
    expect(product).toHaveProperty('quantity')
    expect(product).toHaveProperty('emoji')
  })
})
