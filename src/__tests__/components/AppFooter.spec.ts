import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFooter from '@/components/layout/AppFooter.vue'

describe('AppFooter', () => {
  it('renders default phone', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.text()).toContain('+7 (999) 999-99-99')
  })

  it('renders default email', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.text()).toContain('info@vuepizza.ru')
  })

  it('renders default address', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.text()).toContain('г. Москва, ул. Пиццы, д. 1')
  })

  it('renders custom props', () => {
    const wrapper = mount(AppFooter, {
      props: {
        phone: '+7 (111) 111-11-11',
        email: 'custom@test.ru',
        address: 'Custom address',
      },
    })
    expect(wrapper.text()).toContain('+7 (111) 111-11-11')
    expect(wrapper.text()).toContain('custom@test.ru')
    expect(wrapper.text()).toContain('Custom address')
  })

  it('renders links when provided', () => {
    const wrapper = mount(AppFooter, {
      props: {
        links: [
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' },
        ],
      },
    })
    expect(wrapper.text()).toContain('Privacy')
    expect(wrapper.text()).toContain('Terms')
  })

  it('renders copyright with Vue Pizza', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.text()).toContain('Vue Pizza')
    expect(wrapper.text()).toContain('Все права защищены')
  })

  it('renders current year', () => {
    const wrapper = mount(AppFooter)
    const currentYear = new Date().getFullYear()
    expect(wrapper.text()).toContain(String(currentYear))
  })

  it('has section headings', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.text()).toContain('Контакты')
    expect(wrapper.text()).toContain('О нас')
  })
})
