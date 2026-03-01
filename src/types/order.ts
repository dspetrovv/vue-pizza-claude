export type OrderStatus = 'processing' | 'delivering' | 'completed' | 'cancelled'

export interface OrderProduct {
  id: string | number
  name: string
  description: string
  quantity: number
  price: number
  imageUrl?: string
  emoji?: string
}

export interface Order {
  id: string
  date: string
  total: number
  status: OrderStatus
  statusText: string
  paymentMethod: string
  address: string
  products: OrderProduct[]
}
