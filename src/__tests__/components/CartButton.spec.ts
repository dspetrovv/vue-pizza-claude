import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CartButton from '@/components/ui/CartButton.vue'

describe('CartButton', () => {
  it('renders badge with count', () => {
    const wrapper = mount(CartButton, {
      props: { count: 3 },
    })
    expect(wrapper.find('.cart-button__badge').text()).toBe('3')
  })

  it('renders zero count', () => {
    const wrapper = mount(CartButton, {
      props: { count: 0 },
    })
    expect(wrapper.find('.cart-button__badge').text()).toBe('0')
  })

  it('emits click on button press', async () => {
    const wrapper = mount(CartButton, {
      props: { count: 1 },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('has aria-label with count', () => {
    const wrapper = mount(CartButton, {
      props: { count: 5 },
    })
    expect(wrapper.attributes('aria-label')).toContain('5')
    expect(wrapper.attributes('aria-label')).toContain('Корзина')
  })
})
