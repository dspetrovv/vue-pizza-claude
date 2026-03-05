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

  it('does not render ingredient mods when not provided', () => {
    const wrapper = mount(CartItem, { props: baseProps })
    expect(wrapper.find('.cart-item__mods--added').exists()).toBe(false)
    expect(wrapper.find('.cart-item__mods--removed').exists()).toBe(false)
  })

  it('renders added ingredients in green', () => {
    const wrapper = mount(CartItem, {
      props: { ...baseProps, addedIngredients: ['Шампиньоны', 'Оливки'] },
    })
    const added = wrapper.find('.cart-item__mods--added')
    expect(added.exists()).toBe(true)
    expect(added.text()).toBe('+ Шампиньоны, Оливки')
  })

  it('renders removed ingredients in red', () => {
    const wrapper = mount(CartItem, {
      props: { ...baseProps, removedIngredients: ['Томаты'] },
    })
    const removed = wrapper.find('.cart-item__mods--removed')
    expect(removed.exists()).toBe(true)
    expect(removed.text()).toBe('- Томаты')
  })

  it('renders both added and removed ingredients', () => {
    const wrapper = mount(CartItem, {
      props: {
        ...baseProps,
        addedIngredients: ['Базилик'],
        removedIngredients: ['Пепперони', 'Томаты'],
      },
    })
    expect(wrapper.find('.cart-item__mods--added').text()).toBe('+ Базилик')
    expect(wrapper.find('.cart-item__mods--removed').text()).toBe('- Пепперони, Томаты')
  })
})
