import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '@/components/layout/AppHeader.vue'

const navItems = [
  { label: 'Пицца', value: 'pizza' },
  { label: 'Суши', value: 'sushi' },
  { label: 'Напитки', value: 'drinks' },
]

describe('AppHeader', () => {
  it('renders brand title', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('.app-header__title').text()).toBe('Пиццерия')
  })

  it('renders nav items', () => {
    const wrapper = mount(AppHeader, {
      props: { navItems },
    })
    const items = wrapper.findAll('.app-header__nav-item')
    expect(items.length).toBe(3)
    expect(items[0]!.text()).toBe('Пицца')
  })

  it('marks active nav item', () => {
    const wrapper = mount(AppHeader, {
      props: { navItems, activeNav: 'sushi' },
    })
    const items = wrapper.findAll('.app-header__nav-item')
    expect(items[1]!.classes()).toContain('app-header__nav-item--active')
    expect(items[0]!.classes()).not.toContain('app-header__nav-item--active')
  })

  it('emits nav-click', async () => {
    const wrapper = mount(AppHeader, {
      props: { navItems },
    })
    await wrapper.findAll('.app-header__nav-item')[0]!.trigger('click')
    expect(wrapper.emitted('nav-click')).toEqual([['pizza']])
  })

  it('emits brand-click', async () => {
    const wrapper = mount(AppHeader)
    await wrapper.find('.app-header__brand').trigger('click')
    expect(wrapper.emitted('brand-click')).toBeTruthy()
  })

  it('emits account-click', async () => {
    const wrapper = mount(AppHeader)
    await wrapper.find('.app-header__account').trigger('click')
    expect(wrapper.emitted('account-click')).toBeTruthy()
  })

  it('emits cart-click', async () => {
    const wrapper = mount(AppHeader)
    await wrapper.find('.app-header__cart').trigger('click')
    expect(wrapper.emitted('cart-click')).toBeTruthy()
  })

  it('displays cart total and count', () => {
    const wrapper = mount(AppHeader, {
      props: { cartTotal: 1299, cartCount: 3 },
    })
    expect(wrapper.find('.app-header__cart-total').text()).toContain('1299')
    expect(wrapper.find('.app-header__cart-count').text()).toBe('3')
  })

  it('has accessible brand link', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('.app-header__brand').attributes('aria-label')).toContain('Пиццерия')
  })

  it('has burger button', () => {
    const wrapper = mount(AppHeader, {
      props: { navItems },
    })
    const burger = wrapper.find('.app-header__burger')
    expect(burger.exists()).toBe(true)
    expect(burger.attributes('aria-expanded')).toBe('false')
  })
})
