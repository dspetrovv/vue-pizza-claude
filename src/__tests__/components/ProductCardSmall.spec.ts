import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCardSmall from '@/components/ui/ProductCardSmall.vue'

describe('ProductCardSmall', () => {
  const baseProps = {
    name: 'Картофель',
    price: 179,
  }

  it('renders name and price', () => {
    const wrapper = mount(ProductCardSmall, { props: baseProps })
    expect(wrapper.find('.product-card-small__name').text()).toBe('Картофель')
    expect(wrapper.find('.product-card-small__price-btn').text()).toContain('179')
  })

  it('renders portion when provided', () => {
    const wrapper = mount(ProductCardSmall, {
      props: { ...baseProps, portion: '95 г' },
    })
    expect(wrapper.find('.product-card-small__portion').text()).toBe('95 г')
  })

  it('does not render portion when not provided', () => {
    const wrapper = mount(ProductCardSmall, { props: baseProps })
    expect(wrapper.find('.product-card-small__portion').exists()).toBe(false)
  })

  it('renders emoji', () => {
    const wrapper = mount(ProductCardSmall, {
      props: { ...baseProps, emoji: '🍟' },
    })
    expect(wrapper.find('.product-card-small__emoji').text()).toBe('🍟')
  })

  it('emits add on price button click', async () => {
    const wrapper = mount(ProductCardSmall, { props: baseProps })
    await wrapper.find('.product-card-small__price-btn').trigger('click')
    expect(wrapper.emitted('add')).toBeTruthy()
  })

  it('renders currency in price button', () => {
    const wrapper = mount(ProductCardSmall, { props: baseProps })
    expect(wrapper.find('.product-card-small__price-btn').text()).toContain('₽')
  })
})
