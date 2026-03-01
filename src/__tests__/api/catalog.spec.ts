import { describe, it, expect } from 'vitest'
import { getCatalog } from '@/api/catalog'

describe('getCatalog (mock mode)', () => {
  it('returns catalog data with all required sections', async () => {
    const catalog = await getCatalog()

    expect(catalog).toHaveProperty('filterGroups')
    expect(catalog).toHaveProperty('pizzaDoughOptions')
    expect(catalog).toHaveProperty('pizzaSizeOptions')
    expect(catalog).toHaveProperty('pizzas')
    expect(catalog).toHaveProperty('sales')
    expect(catalog).toHaveProperty('sushi')
    expect(catalog).toHaveProperty('drinks')
    expect(catalog).toHaveProperty('snacks')
    expect(catalog).toHaveProperty('combo')
    expect(catalog).toHaveProperty('desserts')
    expect(catalog).toHaveProperty('sauces')
  })

  it('returns non-empty arrays', async () => {
    const catalog = await getCatalog()

    expect(catalog.filterGroups.length).toBeGreaterThan(0)
    expect(catalog.pizzaDoughOptions.length).toBeGreaterThan(0)
    expect(catalog.pizzaSizeOptions.length).toBeGreaterThan(0)
    expect(catalog.pizzas.length).toBeGreaterThan(0)
    expect(catalog.sales.length).toBeGreaterThan(0)
    expect(catalog.sushi.length).toBeGreaterThan(0)
    expect(catalog.drinks.length).toBeGreaterThan(0)
  })

  it('pizzas have ingredients and addons', async () => {
    const catalog = await getCatalog()
    const pizza = catalog.pizzas[0]!

    expect(pizza).toHaveProperty('name')
    expect(pizza).toHaveProperty('description')
    expect(pizza).toHaveProperty('price')
    expect(pizza).toHaveProperty('emoji')
    expect(pizza).toHaveProperty('weight')
    expect(pizza).toHaveProperty('ingredients')
    expect(pizza).toHaveProperty('addons')
    expect(Array.isArray(pizza.ingredients)).toBe(true)
    expect(Array.isArray(pizza.addons)).toBe(true)
  })

  it('filter groups have title and items', async () => {
    const catalog = await getCatalog()
    const group = catalog.filterGroups[0]!

    expect(group).toHaveProperty('title')
    expect(group).toHaveProperty('items')
    expect(Array.isArray(group.items)).toBe(true)
    expect(group.items.length).toBeGreaterThan(0)
  })
})
