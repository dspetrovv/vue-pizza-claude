export interface CartItemData {
  id: string | number
  name: string
  description: string
  price: number
  quantity: number
  imageUrl?: string
  emoji?: string
  addedIngredients?: string[]
  removedIngredients?: string[]
}
