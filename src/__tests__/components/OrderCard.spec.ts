import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrderCard from '@/components/ui/OrderCard.vue'
import type { Order } from '@/types/order'

const mockOrder: Order = {
  id: '123',
  date: '15 февраля 2025',
  total: 1899,
  status: 'completed',
  statusText: 'Выполнен',
  paymentMethod: 'Картой',
  address: 'ул. Пушкина, д. 10',
  products: [
    { id: 'p1', name: 'Пепперони', description: 'Тонкое, 30 см', quantity: 2, price: 899, emoji: '🍕' },
    { id: 'p2', name: 'Кола', description: '0.5л', quantity: 1, price: 119, emoji: '🥤' },
  ],
}

describe('OrderCard', () => {
  it('renders order number', () => {
    const wrapper = mount(OrderCard, {
      props: { order: mockOrder },
    })
    expect(wrapper.text()).toContain('№123')
  })

  it('renders order date', () => {
    const wrapper = mount(OrderCard, {
      props: { order: mockOrder },
    })
    expect(wrapper.text()).toContain('15 февраля 2025')
  })

  it('renders order total formatted', () => {
    const wrapper = mount(OrderCard, {
      props: { order: mockOrder },
    })
    // formatPrice uses Russian locale
    expect(wrapper.text()).toMatch(/1\s?899/)
  })

  it('renders status text', () => {
    const wrapper = mount(OrderCard, {
      props: { order: mockOrder },
    })
    expect(wrapper.text()).toContain('Выполнен')
  })

  it('renders payment method', () => {
    const wrapper = mount(OrderCard, {
      props: { order: mockOrder },
    })
    expect(wrapper.text()).toContain('Картой')
  })

  it('renders address', () => {
    const wrapper = mount(OrderCard, {
      props: { order: mockOrder },
    })
    expect(wrapper.text()).toContain('ул. Пушкина, д. 10')
  })

  it('shows product thumbnails when collapsed', () => {
    const wrapper = mount(OrderCard, {
      props: { order: mockOrder },
    })
    expect(wrapper.findAll('.order-card__thumb').length).toBe(2)
  })

  it('shows products list when expanded', async () => {
    const wrapper = mount(OrderCard, {
      props: { order: mockOrder },
    })
    await wrapper.find('.order-card__header').trigger('click')
    expect(wrapper.find('.order-card__body').exists()).toBe(true)
    expect(wrapper.findAll('.order-card__product').length).toBe(2)
    expect(wrapper.text()).toContain('Пепперони')
  })

  it('hides thumbnails when expanded', async () => {
    const wrapper = mount(OrderCard, {
      props: { order: mockOrder },
    })
    await wrapper.find('.order-card__header').trigger('click')
    expect(wrapper.find('.order-card__thumbnails').exists()).toBe(false)
  })

  it('emits repeat on button click', async () => {
    const wrapper = mount(OrderCard, {
      props: { order: mockOrder },
    })
    await wrapper.find('.order-card__header').trigger('click')
    await wrapper.find('.order-card__repeat').trigger('click')
    expect(wrapper.emitted('repeat')).toEqual([['123']])
  })

  it('applies status class', () => {
    const wrapper = mount(OrderCard, {
      props: { order: mockOrder },
    })
    expect(wrapper.find('article').classes()).toContain('order-card--completed')
  })

  it('has accessible aria-label', () => {
    const wrapper = mount(OrderCard, {
      props: { order: mockOrder },
    })
    expect(wrapper.find('article').attributes('aria-label')).toBe('Заказ №123')
  })
})
