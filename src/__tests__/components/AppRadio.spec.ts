import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppRadio from '@/components/ui/AppRadio.vue'

describe('AppRadio', () => {
  it('renders label text', () => {
    const wrapper = mount(AppRadio, {
      props: { modelValue: 'a', value: 'a', name: 'test', label: 'Option A' },
    })
    expect(wrapper.text()).toContain('Option A')
  })

  it('reflects checked state when value matches modelValue', () => {
    const wrapper = mount(AppRadio, {
      props: { modelValue: 'a', value: 'a', name: 'test', label: 'A' },
    })
    const input = wrapper.find('input[type="radio"]')
    expect((input.element as HTMLInputElement).checked).toBe(true)
  })

  it('reflects unchecked state when value differs', () => {
    const wrapper = mount(AppRadio, {
      props: { modelValue: 'a', value: 'b', name: 'test', label: 'B' },
    })
    const input = wrapper.find('input[type="radio"]')
    expect((input.element as HTMLInputElement).checked).toBe(false)
  })

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(AppRadio, {
      props: { modelValue: 'a', value: 'b', name: 'test', label: 'B' },
    })
    await wrapper.find('input[type="radio"]').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
  })

  it('sets name attribute', () => {
    const wrapper = mount(AppRadio, {
      props: { modelValue: 'a', value: 'a', name: 'myGroup', label: 'A' },
    })
    const input = wrapper.find('input[type="radio"]')
    expect(input.attributes('name')).toBe('myGroup')
  })
})
