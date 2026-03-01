import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CategoryButton from '@/components/ui/CategoryButton.vue'

describe('CategoryButton', () => {
  it('renders label', () => {
    const wrapper = mount(CategoryButton, {
      props: { label: 'Пицца' },
    })
    expect(wrapper.find('.category-button__label').text()).toBe('Пицца')
  })

  it('renders emoji', () => {
    const wrapper = mount(CategoryButton, {
      props: { label: 'Пицца', emoji: '🍕' },
    })
    expect(wrapper.find('.category-button__emoji').text()).toBe('🍕')
  })

  it('applies active class', () => {
    const wrapper = mount(CategoryButton, {
      props: { label: 'Пицца', active: true },
    })
    expect(wrapper.classes()).toContain('category-button--active')
  })

  it('does not apply active class by default', () => {
    const wrapper = mount(CategoryButton, {
      props: { label: 'Пицца' },
    })
    expect(wrapper.classes()).not.toContain('category-button--active')
  })

  it('emits click', async () => {
    const wrapper = mount(CategoryButton, {
      props: { label: 'Пицца' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
