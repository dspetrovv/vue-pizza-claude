import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppCheckbox from '@/components/ui/AppCheckbox.vue'

describe('AppCheckbox', () => {
  it('renders label text', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false, label: 'Subscribe' },
    })
    expect(wrapper.text()).toContain('Subscribe')
  })

  it('reflects checked state', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: true, label: 'Active' },
    })
    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).checked).toBe(true)
  })

  it('reflects unchecked state', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false, label: 'Inactive' },
    })
    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).checked).toBe(false)
  })

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false, label: 'Toggle' },
    })
    await wrapper.find('input[type="checkbox"]').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('emits toggled value (true → false)', async () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: true, label: 'Toggle' },
    })
    await wrapper.find('input[type="checkbox"]').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
  })
})
