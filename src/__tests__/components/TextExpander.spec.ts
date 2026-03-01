import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TextExpander from '@/components/ui/TextExpander.vue'

describe('TextExpander', () => {
  it('renders title when provided', () => {
    const wrapper = mount(TextExpander, {
      props: { title: 'О нас' },
      slots: { default: '<p>Content text</p>' },
    })
    expect(wrapper.find('.text-expander__title').text()).toBe('О нас')
  })

  it('renders slot content', () => {
    const wrapper = mount(TextExpander, {
      slots: { default: '<p>Hello world</p>' },
    })
    expect(wrapper.text()).toContain('Hello world')
  })

  it('starts collapsed', () => {
    const wrapper = mount(TextExpander, {
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.find('.text-expander__body--collapsed').exists()).toBe(true)
    expect(wrapper.find('.text-expander__toggle').text()).toContain('Показать полностью')
  })

  it('expands on toggle click', async () => {
    const wrapper = mount(TextExpander, {
      slots: { default: '<p>Content</p>' },
    })
    await wrapper.find('.text-expander__toggle').trigger('click')
    expect(wrapper.find('.text-expander__body--collapsed').exists()).toBe(false)
    expect(wrapper.find('.text-expander__toggle').text()).toContain('Скрыть')
  })

  it('collapses back on second click', async () => {
    const wrapper = mount(TextExpander, {
      slots: { default: '<p>Content</p>' },
    })
    const toggle = wrapper.find('.text-expander__toggle')
    await toggle.trigger('click')
    await toggle.trigger('click')
    expect(wrapper.find('.text-expander__body--collapsed').exists()).toBe(true)
  })

  it('toggle has aria-expanded', async () => {
    const wrapper = mount(TextExpander, {
      slots: { default: '<p>Content</p>' },
    })
    const toggle = wrapper.find('.text-expander__toggle')
    expect(toggle.attributes('aria-expanded')).toBe('false')
    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')
  })
})
