import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppInput from '@/components/ui/AppInput.vue'

describe('AppInput', () => {
  it('renders with value', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: 'hello' },
    })
    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('hello')
  })

  it('renders label when provided', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', label: 'Email' },
    })
    expect(wrapper.find('label').text()).toBe('Email')
  })

  it('does not render label when not provided', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('renders placeholder', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', placeholder: 'Enter text' },
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
    })
    const input = wrapper.find('input')
    await input.setValue('test')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('renders error message', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', error: 'Required field' },
    })
    expect(wrapper.find('[role="alert"]').text()).toBe('Required field')
  })

  it('sets aria-invalid when error present', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', error: 'Error' },
    })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('renders disabled state', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', disabled: true },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('renders suffix text', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', suffix: '₽' },
    })
    expect(wrapper.find('.app-input__suffix').text()).toBe('₽')
  })

  it('renders prefix slot', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
      slots: { prefix: '+7' },
    })
    expect(wrapper.find('.app-input__prefix').text()).toBe('+7')
  })

  it('applies type attribute', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', type: 'email' },
    })
    expect(wrapper.find('input').attributes('type')).toBe('email')
  })
})
