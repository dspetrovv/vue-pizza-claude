import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CartItem from '@/components/ui/CartItem.vue'

describe('CartItem', () => {
  const baseProps = {
    name: 'Пицца Пепперони',
    description: 'Тонкое тесто, 30 см',
    price: 899,
    quantity: 2,
    emoji: '🍕',
  }

  it('renders name and description', () => {
    const wrapper = mount(CartItem, { props: baseProps })
    expect(wrapper.find('.cart-item__name').text()).toBe('Пицца Пепперони')
    expect(wrapper.find('.cart-item__description').text()).toBe('Тонкое тесто, 30 см')
  })

  it('renders price with currency', () => {
    const wrapper = mount(CartItem, { props: baseProps })
    expect(wrapper.find('.cart-item__price').text()).toContain('899')
    expect(wrapper.find('.cart-item__price').text()).toContain('₽')
  })

  it('renders emoji', () => {
    const wrapper = mount(CartItem, { props: baseProps })
    expect(wrapper.find('.cart-item__emoji').text()).toBe('🍕')
  })

  it('emits remove on remove button click', async () => {
    const wrapper = mount(CartItem, { props: baseProps })
    await wrapper.find('.cart-item__remove').trigger('click')
    expect(wrapper.emitted('remove')).toBeTruthy()
  })

  it('renders counter with quantity', () => {
    const wrapper = mount(CartItem, { props: baseProps })
    expect(wrapper.text()).toContain('2')
  })

  it('has accessible remove button', () => {
    const wrapper = mount(CartItem, { props: baseProps })
    expect(wrapper.find('.cart-item__remove').attributes('aria-label')).toBe('Удалить')
  })
})
