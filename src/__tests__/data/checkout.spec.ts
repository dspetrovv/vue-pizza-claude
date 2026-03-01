import { describe, it, expect } from 'vitest'
import { timeOptions, suggestions, restaurantOptions } from '@/data/checkout'

describe('checkout data', () => {
  it('timeOptions has label and value', () => {
    expect(timeOptions.length).toBeGreaterThan(0)
    for (const opt of timeOptions) {
      expect(opt.label).toBeTruthy()
      expect(opt.value).toBeTruthy()
    }
  })

  it('suggestions have id, name, price', () => {
    expect(suggestions.length).toBeGreaterThan(0)
    for (const s of suggestions) {
      expect(s.id).toBeTruthy()
      expect(s.name).toBeTruthy()
      expect(s.price).toBeGreaterThan(0)
    }
  })

  it('restaurantOptions have label and value', () => {
    expect(restaurantOptions.length).toBeGreaterThan(0)
    for (const r of restaurantOptions) {
      expect(r.label).toBeTruthy()
      expect(r.value).toBeTruthy()
    }
  })
})
