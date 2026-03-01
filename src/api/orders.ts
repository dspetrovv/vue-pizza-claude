import { isMockMode } from '@/config'
import { apiClient } from '@/api/client'
import { fetchOrders as fetchMockOrders } from '@/utils/fakeOrderApi'
import type { Order } from '@/types/order'

export interface FetchOrdersResponse {
  orders: Order[]
  hasMore: boolean
  total: number
}

export interface CreateOrderPayload {
  items: Array<{ id: string | number; quantity: number; price: number }>
  customerName: string
  customerPhone: string
  customerEmail: string
  deliveryMode: 'delivery' | 'pickup'
  address?: string
  restaurant?: string
  timing: 'asap' | 'scheduled'
  scheduledDate?: string
  scheduledTime?: string
  payment: string
  comment?: string
}

export interface CreateOrderResponse {
  orderId: string
}

export async function getOrders(page: number): Promise<FetchOrdersResponse> {
  if (isMockMode()) {
    return fetchMockOrders(page)
  }

  return apiClient<FetchOrdersResponse>(`/orders?page=${page}`)
}

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  if (isMockMode()) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { orderId: String(Math.floor(1000 + Math.random() * 9000)) }
  }

  return apiClient<CreateOrderResponse>('/orders', { method: 'POST', body: payload })
}
