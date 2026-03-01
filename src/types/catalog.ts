import type { IngredientItem, AddonItem } from '@/types/product'

export interface FilterGroup {
  title: string
  items: string[]
}

export interface SelectOption {
  label: string
  value: string
}

export type DoughOption = SelectOption
export type SizeOption = SelectOption

export interface PizzaProduct {
  name: string
  description: string
  price: number
  tag?: string
  emoji: string
  weight: string
  ingredients: IngredientItem[]
  addons: AddonItem[]
}

export interface CatalogProduct {
  name: string
  description: string
  price: number
  tag?: string
  emoji?: string
}

export interface CatalogProductSmall {
  name: string
  price: number
  portion?: string
  emoji?: string
}

export interface CatalogData {
  filterGroups: FilterGroup[]
  pizzaDoughOptions: DoughOption[]
  pizzaSizeOptions: SizeOption[]
  pizzas: PizzaProduct[]
  sales: CatalogProduct[]
  sushi: CatalogProduct[]
  drinks: CatalogProductSmall[]
  snacks: CatalogProductSmall[]
  combo: CatalogProduct[]
  desserts: CatalogProductSmall[]
  sauces: CatalogProductSmall[]
}
