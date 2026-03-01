import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSelect from '@/components/ui/AppSelect.vue'

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
]

describe('AppSelect', () => {
  it('renders selected value label', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: 'b', options },
    })
    expect(wrapper.find('.app-select__value').text()).toBe('Option B')
  })

  it('renders placeholder when no value selected', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options, placeholder: 'Choose...' },
    })
    expect(wrapper.find('.app-select__placeholder').text()).toBe('Choose...')
  })

  it('opens dropdown on trigger click', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: 'a', options },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    expect(wrapper.find('.app-select__dropdown').exists()).toBe(true)
  })

  it('closes dropdown on second click', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: 'a', options },
    })
    const trigger = wrapper.find('.app-select__trigger')
    await trigger.trigger('click')
    await trigger.trigger('click')
    expect(wrapper.find('.app-select__dropdown').exists()).toBe(false)
  })

  it('emits update:modelValue on option select', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: 'a', options },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    const items = wrapper.findAll('.app-select__option')
    await items[1]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
  })

  it('closes dropdown after selection', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: 'a', options },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    await wrapper.findAll('.app-select__option')[1]!.trigger('click')
    expect(wrapper.find('.app-select__dropdown').exists()).toBe(false)
  })

  it('marks selected option', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: 'b', options },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    const items = wrapper.findAll('.app-select__option')
    expect(items[1]!.classes()).toContain('app-select__option--selected')
  })

  it('has combobox role', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: 'a', options },
    })
    expect(wrapper.find('.app-select__trigger').attributes('role')).toBe('combobox')
  })

  it('renders label when provided', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: 'a', options, label: 'City' },
    })
    expect(wrapper.find('.app-select__label').text()).toBe('City')
  })

  it('renders error', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options, error: 'Required' },
    })
    expect(wrapper.find('.app-select__error').text()).toBe('Required')
  })

  it('does not open when disabled', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: 'a', options, disabled: true },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    expect(wrapper.find('.app-select__dropdown').exists()).toBe(false)
  })
})
