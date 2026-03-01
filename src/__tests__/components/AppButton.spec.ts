import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from '@/components/ui/AppButton.vue'

describe('AppButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('applies primary variant by default', () => {
    const wrapper = mount(AppButton)
    expect(wrapper.classes()).toContain('app-button--primary')
  })

  it('applies variant class', () => {
    const wrapper = mount(AppButton, {
      props: { variant: 'outline' },
    })
    expect(wrapper.classes()).toContain('app-button--outline')
  })

  it('applies ghost variant class', () => {
    const wrapper = mount(AppButton, {
      props: { variant: 'ghost' },
    })
    expect(wrapper.classes()).toContain('app-button--ghost')
  })

  it('applies size class', () => {
    const wrapper = mount(AppButton, {
      props: { size: 'sm' },
    })
    expect(wrapper.classes()).toContain('app-button--sm')
  })

  it('default size is md', () => {
    const wrapper = mount(AppButton)
    expect(wrapper.classes()).toContain('app-button--md')
  })

  it('applies circle class', () => {
    const wrapper = mount(AppButton, {
      props: { circle: true },
    })
    expect(wrapper.classes()).toContain('app-button--circle')
  })

  it('renders as disabled', () => {
    const wrapper = mount(AppButton, {
      props: { disabled: true },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('app-button--disabled')
  })

  it('shows spinner when loading', () => {
    const wrapper = mount(AppButton, {
      props: { loading: true },
      slots: { default: 'Save' },
    })
    expect(wrapper.find('.app-button__spinner').exists()).toBe(true)
    expect(wrapper.classes()).toContain('app-button--loading')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toBe('true')
  })

  it('emits click event', async () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Click' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')!.length).toBe(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(AppButton, {
      props: { disabled: true },
    })
    await wrapper.trigger('click')
    // Native button disabled prevents event
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
