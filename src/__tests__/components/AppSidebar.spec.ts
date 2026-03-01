import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSidebar from '@/components/ui/AppSidebar.vue'

describe('AppSidebar', () => {
  it('renders when modelValue is true', () => {
    const wrapper = mount(AppSidebar, {
      props: { modelValue: true, title: 'Panel' },
      attachTo: document.body,
    })
    expect(document.querySelector('.app-sidebar')).toBeTruthy()
    expect(document.body.textContent).toContain('Panel')
    wrapper.unmount()
  })

  it('does not render when modelValue is false', () => {
    const wrapper = mount(AppSidebar, {
      props: { modelValue: false, title: 'Panel' },
      attachTo: document.body,
    })
    expect(document.querySelector('.app-sidebar')).toBeFalsy()
    wrapper.unmount()
  })

  it('emits update:modelValue(false) on close button click', async () => {
    const wrapper = mount(AppSidebar, {
      props: { modelValue: true, title: 'Panel' },
      attachTo: document.body,
    })
    const closeBtn = document.querySelector('.app-sidebar__close') as HTMLElement
    closeBtn?.click()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('renders title in header', () => {
    const wrapper = mount(AppSidebar, {
      props: { modelValue: true, title: 'Корзина' },
      attachTo: document.body,
    })
    expect(document.querySelector('.app-sidebar__title')?.textContent).toBe('Корзина')
    wrapper.unmount()
  })

  it('renders default slot content', () => {
    const wrapper = mount(AppSidebar, {
      props: { modelValue: true },
      slots: { default: '<p>Body content</p>' },
      attachTo: document.body,
    })
    expect(document.querySelector('.app-sidebar__body')?.textContent).toContain('Body content')
    wrapper.unmount()
  })

  it('has dialog role and aria-modal', () => {
    const wrapper = mount(AppSidebar, {
      props: { modelValue: true, title: 'Test' },
      attachTo: document.body,
    })
    const dialog = document.querySelector('.app-sidebar')
    expect(dialog?.getAttribute('role')).toBe('dialog')
    expect(dialog?.getAttribute('aria-modal')).toBe('true')
    wrapper.unmount()
  })
})
