import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PriceBadge from '@/components/ui/PriceBadge.vue'

describe('PriceBadge', () => {
  it('renders price with default prefix and currency', () => {
    const wrapper = mount(PriceBadge, {
      props: { price: 499 },
    })
    expect(wrapper.text()).toContain('от')
    expect(wrapper.text()).toContain('499')
    expect(wrapper.text()).toContain('₽')
  })

  it('renders custom prefix', () => {
    const wrapper = mount(PriceBadge, {
      props: { price: 299, prefix: 'от' },
    })
    expect(wrapper.text()).toContain('от')
    expect(wrapper.text()).toContain('299')
  })

  it('renders custom currency', () => {
    const wrapper = mount(PriceBadge, {
      props: { price: 100, currency: '$' },
    })
    expect(wrapper.text()).toContain('$')
  })

  it('has price-badge class', () => {
    const wrapper = mount(PriceBadge, {
      props: { price: 499 },
    })
    expect(wrapper.classes()).toContain('price-badge')
  })
})
