import type { Order, OrderStatus, OrderProduct } from '@/types/order'

interface FetchOrdersResponse {
  orders: Order[]
  hasMore: boolean
  total: number
}

const STATUSES: Array<{ status: OrderStatus; text: string }> = [
  { status: 'completed', text: 'Выполнен' },
  { status: 'processing', text: 'Обрабатывается' },
  { status: 'delivering', text: 'Едет к вам' },
  { status: 'cancelled', text: 'Отмена' },
]

const PAYMENT_METHODS = ['Наличными', 'Картой', 'Apple Pay', 'Google Pay']

const ADDRESSES = [
  'ул. Пушкина, д. 10',
  'ул. Ленина, д. 25, кв. 14',
  'ул. Гагарина, д. 3',
  'пр. Мира, д. 48, кв. 7',
  'ул. Чехова, д. 15',
  'ул. Лермонтова, д. 9, кв. 22',
]

const PRODUCT_POOL: Array<Omit<OrderProduct, 'id' | 'quantity'>> = [
  { name: 'Пицца Пепперони', description: 'Тонкое тесто, 30 см', price: 899, emoji: '🍕' },
  { name: 'Пицца Маргарита', description: 'Традиционное тесто, 25 см', price: 579, emoji: '🍕' },
  { name: 'Пицца 4 сыра', description: 'Тонкое тесто, 30 см', price: 749, emoji: '🍕' },
  { name: 'Пицца Гавайская', description: 'Традиционное тесто, 30 см', price: 699, emoji: '🍕' },
  { name: 'Пицца Карбонара', description: 'Тонкое тесто, 25 см', price: 849, emoji: '🍕' },
  { name: 'Картофель из печи', description: 'Порция 95 г', price: 179, emoji: '🍟' },
  { name: 'Куриные наггетсы', description: 'Порция 100 г', price: 169, emoji: '🍗' },
  { name: 'Сырные палочки', description: 'Порция 80 г', price: 149, emoji: '🧀' },
  { name: 'Филадельфия крем-брюле', description: 'Порция 95 г', price: 179, emoji: '🍣' },
  { name: 'Кока-Кола', description: '0.5 л', price: 119, emoji: '🥤' },
  { name: 'Цезарь-ролл', description: 'Порция 220 г', price: 299, emoji: '🌯' },
  { name: 'Додстер', description: 'Порция 200 г', price: 219, emoji: '🌮' },
]

/** Seeded pseudo-random for deterministic results */
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function generateOrder(index: number, random: () => number): Order {
  const id = String(200 - index)
  const dayOffset = index * 2 + Math.floor(random() * 3)
  const date = new Date(2025, 1, 19)
  date.setDate(date.getDate() - dayOffset)

  const day = date.getDate()
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ]
  const dateStr = `${day} ${months[date.getMonth()]} ${date.getFullYear()}`

  const statusInfo = STATUSES[Math.floor(random() * STATUSES.length)]!
  const paymentMethod = PAYMENT_METHODS[Math.floor(random() * PAYMENT_METHODS.length)]!
  const address = ADDRESSES[Math.floor(random() * ADDRESSES.length)]!

  const productCount = 1 + Math.floor(random() * 4)
  const usedIndices = new Set<number>()
  const products: OrderProduct[] = []

  for (let p = 0; p < productCount; p++) {
    let poolIndex: number
    do {
      poolIndex = Math.floor(random() * PRODUCT_POOL.length)
    } while (usedIndices.has(poolIndex) && usedIndices.size < PRODUCT_POOL.length)
    usedIndices.add(poolIndex)

    const base = PRODUCT_POOL[poolIndex]!
    products.push({
      id: `p-${index}-${p}`,
      name: base.name,
      description: base.description,
      price: base.price,
      emoji: base.emoji,
      quantity: 1 + Math.floor(random() * 3),
    })
  }

  const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0)

  return {
    id,
    date: dateStr,
    total,
    status: statusInfo.status,
    statusText: statusInfo.text,
    paymentMethod,
    address,
    products,
  }
}

const TOTAL_ORDERS = 47
const PAGE_SIZE = 6

/**
 * Simulates fetching orders from a backend.
 * Returns a page of orders with a `hasMore` flag.
 */
export function fetchOrders(page: number): Promise<FetchOrdersResponse> {
  return new Promise((resolve) => {
    const delay = 400 + Math.random() * 600
    setTimeout(() => {
      const random = seededRandom(page * 1000 + 42)
      const startIndex = (page - 1) * PAGE_SIZE
      const count = Math.min(PAGE_SIZE, TOTAL_ORDERS - startIndex)

      const orders: Order[] = []
      for (let i = 0; i < count; i++) {
        orders.push(generateOrder(startIndex + i, random))
      }

      resolve({
        orders,
        hasMore: startIndex + count < TOTAL_ORDERS,
        total: TOTAL_ORDERS,
      })
    }, delay)
  })
}
