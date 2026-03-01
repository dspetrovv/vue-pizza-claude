import { describe, it, expect } from 'vitest'
import { getTimeSlots, getSuggestions, getRestaurants } from '@/api/checkout'

describe('getTimeSlots (mock mode)', () => {
  it('returns array of time options', async () => {
    const slots = await getTimeSlots()

    expect(Array.isArray(slots)).toBe(true)
    expect(slots.length).toBeGreaterThan(0)
  })

  it('each option has label and value', async () => {
    const slots = await getTimeSlots()
    const slot = slots[0]!

    expect(slot).toHaveProperty('label')
    expect(slot).toHaveProperty('value')
    expect(typeof slot.label).toBe('string')
    expect(typeof slot.value).toBe('string')
  })
})

describe('getSuggestions (mock mode)', () => {
  it('returns array of suggestions', async () => {
    const suggestions = await getSuggestions()

    expect(Array.isArray(suggestions)).toBe(true)
    expect(suggestions.length).toBeGreaterThan(0)
  })

  it('each suggestion has required fields', async () => {
    const suggestions = await getSuggestions()
    const s = suggestions[0]!

    expect(s).toHaveProperty('id')
    expect(s).toHaveProperty('name')
    expect(s).toHaveProperty('price')
    expect(typeof s.price).toBe('number')
  })
})

describe('getRestaurants (mock mode)', () => {
  it('returns array of restaurants', async () => {
    const restaurants = await getRestaurants()

    expect(Array.isArray(restaurants)).toBe(true)
    expect(restaurants.length).toBeGreaterThan(0)
  })

  it('each restaurant has label and value', async () => {
    const restaurants = await getRestaurants()
    const r = restaurants[0]!

    expect(r).toHaveProperty('label')
    expect(r).toHaveProperty('value')
    expect(typeof r.label).toBe('string')
    expect(typeof r.value).toBe('string')
  })
})
