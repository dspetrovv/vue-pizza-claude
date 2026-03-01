import { describe, it, expect } from 'vitest'
import {
  filterGroups,
  pizzaDoughOptions,
  pizzaSizeOptions,
  pizzas,
  sales,
  sushi,
  drinks,
  snacks,
  combo,
  desserts,
  sauces,
} from '@/data/catalog'

describe('catalog data', () => {
  it('filterGroups is non-empty array with titles and items', () => {
    expect(filterGroups.length).toBeGreaterThan(0)
    for (const group of filterGroups) {
      expect(group.title).toBeTruthy()
      expect(group.items.length).toBeGreaterThan(0)
    }
  })

  it('pizzaDoughOptions has label and value', () => {
    expect(pizzaDoughOptions.length).toBeGreaterThan(0)
    for (const opt of pizzaDoughOptions) {
      expect(opt.label).toBeTruthy()
      expect(opt.value).toBeTruthy()
    }
  })

  it('pizzaSizeOptions has label and value', () => {
    expect(pizzaSizeOptions.length).toBeGreaterThan(0)
    for (const opt of pizzaSizeOptions) {
      expect(opt.label).toBeTruthy()
      expect(opt.value).toBeTruthy()
    }
  })

  it('pizzas have complete data', () => {
    expect(pizzas.length).toBeGreaterThan(0)
    for (const pizza of pizzas) {
      expect(pizza.name).toBeTruthy()
      expect(pizza.description).toBeTruthy()
      expect(pizza.price).toBeGreaterThan(0)
      expect(pizza.emoji).toBeTruthy()
      expect(pizza.weight).toBeTruthy()
      expect(pizza.ingredients.length).toBeGreaterThan(0)
      expect(pizza.addons.length).toBeGreaterThan(0)
    }
  })

  it('all product arrays are non-empty', () => {
    expect(sales.length).toBeGreaterThan(0)
    expect(sushi.length).toBeGreaterThan(0)
    expect(drinks.length).toBeGreaterThan(0)
    expect(snacks.length).toBeGreaterThan(0)
    expect(combo.length).toBeGreaterThan(0)
    expect(desserts.length).toBeGreaterThan(0)
    expect(sauces.length).toBeGreaterThan(0)
  })

  it('products have name and price', () => {
    for (const product of [...sales, ...sushi, ...combo]) {
      expect(product.name).toBeTruthy()
      expect(product.price).toBeGreaterThan(0)
    }
    for (const product of [...drinks, ...snacks, ...desserts, ...sauces]) {
      expect(product.name).toBeTruthy()
      expect(product.price).toBeGreaterThan(0)
    }
  })
})
