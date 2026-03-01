import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CartSummary from '@/components/ui/CartSummary.vue'

describe('CartSummary', () => {
  it('renders total with currency', () => {
    const wrapper = mount(CartSummary, {
      props: { total: 1500 },
    })
    expect(wrapper.text()).toContain('1500')
    expect(wrapper.text()).toContain('₽')
    expect(wrapper.text()).toContain('Итого')
  })

  it('renders weight when provided', () => {
    const wrapper = mount(CartSummary, {
      props: { total: 1500, weight: '850 г' },
    })
    expect(wrapper.find('.cart-summary__weight').text()).toBe('850 г')
  })

  it('does not render weight when not provided', () => {
    const wrapper = mount(CartSummary, {
      props: { total: 1500 },
    })
    expect(wrapper.find('.cart-summary__weight').exists()).toBe(false)
  })

  it('renders default button label', () => {
    const wrapper = mount(CartSummary, {
      props: { total: 100 },
    })
    expect(wrapper.find('.cart-summary__button').text()).toBe('В корзину')
  })

  it('renders custom button label', () => {
    const wrapper = mount(CartSummary, {
      props: { total: 100, buttonLabel: 'Оформить' },
    })
    expect(wrapper.find('.cart-summary__button').text()).toBe('Оформить')
  })

  it('emits submit on button click', async () => {
    const wrapper = mount(CartSummary, {
      props: { total: 100 },
    })
    await wrapper.find('.cart-summary__button').trigger('click')
    expect(wrapper.emitted('submit')).toBeTruthy()
  })
})
