import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ui/ProductCard.vue'

describe('ProductCard', () => {
  const baseProps = {
    name: 'Пепперони',
    description: 'Томатный соус, моцарелла, пепперони',
    price: 499,
  }

  it('renders name and description', () => {
    const wrapper = mount(ProductCard, { props: baseProps })
    expect(wrapper.find('.product-card__name').text()).toBe('Пепперони')
    expect(wrapper.find('.product-card__description').text()).toContain('Томатный соус')
  })

  it('renders price with default prefix', () => {
    const wrapper = mount(ProductCard, { props: baseProps })
    expect(wrapper.find('.product-card__price').text()).toContain('от')
    expect(wrapper.find('.product-card__price').text()).toContain('499')
  })

  it('renders emoji when provided', () => {
    const wrapper = mount(ProductCard, {
      props: { ...baseProps, emoji: '🍕' },
    })
    expect(wrapper.find('.product-card__emoji').text()).toBe('🍕')
  })

  it('renders tag when provided', () => {
    const wrapper = mount(ProductCard, {
      props: { ...baseProps, tag: 'Хит' },
    })
    expect(wrapper.text()).toContain('Хит')
  })

  it('does not render tag when not provided', () => {
    const wrapper = mount(ProductCard, { props: baseProps })
    expect(wrapper.find('.product-card__tag').exists()).toBe(false)
  })

  it('emits select on button click', async () => {
    const wrapper = mount(ProductCard, { props: baseProps })
    await wrapper.find('.product-card__btn').trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
  })

  it('has article aria-label', () => {
    const wrapper = mount(ProductCard, { props: baseProps })
    expect(wrapper.find('article').attributes('aria-label')).toBe('Пепперони')
  })

  it('has accessible select button', () => {
    const wrapper = mount(ProductCard, { props: baseProps })
    const btn = wrapper.find('.product-card__btn')
    expect(btn.attributes('aria-label')).toContain('Выбрать')
    expect(btn.attributes('aria-label')).toContain('Пепперони')
  })
})
