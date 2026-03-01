import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTextarea from '@/components/ui/AppTextarea.vue'

describe('AppTextarea', () => {
  it('renders with value', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: 'some text' },
    })
    const textarea = wrapper.find('textarea')
    expect((textarea.element as HTMLTextAreaElement).value).toBe('some text')
  })

  it('renders label', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', label: 'Comment' },
    })
    expect(wrapper.find('label').text()).toBe('Comment')
  })

  it('renders error message', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', error: 'Too short' },
    })
    expect(wrapper.find('[role="alert"]').text()).toBe('Too short')
  })

  it('sets rows attribute', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', rows: 6 },
    })
    expect(wrapper.find('textarea').attributes('rows')).toBe('6')
  })

  it('default rows is 4', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('textarea').attributes('rows')).toBe('4')
  })

  it('renders disabled state', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', disabled: true },
    })
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })
})
