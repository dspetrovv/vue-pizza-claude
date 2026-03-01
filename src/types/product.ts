export interface IngredientItem {
  id: string | number
  name: string
  imageUrl?: string
  emoji?: string
}

export interface AddonItem {
  id: string | number
  name: string
  price: number
  imageUrl?: string
  emoji?: string
}

export interface ProductConfig {
  dough: string
  size: string
  removedIngredients: (string | number)[]
  selectedAddons: (string | number)[]
  totalPrice: number
}
