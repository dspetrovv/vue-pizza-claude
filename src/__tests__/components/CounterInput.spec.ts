import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CounterInput from '@/components/ui/CounterInput.vue'

describe('CounterInput', () => {
  it('displays current value', () => {
    const wrapper = mount(CounterInput, {
      props: { modelValue: 3 },
    })
    expect(wrapper.find('.counter-input__value').text()).toBe('3')
  })

  it('emits update:modelValue with decremented value on minus click', async () => {
    const wrapper = mount(CounterInput, {
      props: { modelValue: 3 },
    })
    const buttons = wrapper.findAll('button')
    await buttons[0]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
  })

  it('emits update:modelValue with incremented value on plus click', async () => {
    const wrapper = mount(CounterInput, {
      props: { modelValue: 3 },
    })
    const buttons = wrapper.findAll('button')
    await buttons[1]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[4]])
  })

  it('disables minus button at min value', () => {
    const wrapper = mount(CounterInput, {
      props: { modelValue: 1, min: 1 },
    })
    const minusBtn = wrapper.findAll('button')[0]!
    expect(minusBtn.attributes('disabled')).toBeDefined()
  })

  it('disables plus button at max value', () => {
    const wrapper = mount(CounterInput, {
      props: { modelValue: 99, max: 99 },
    })
    const plusBtn = wrapper.findAll('button')[1]!
    expect(plusBtn.attributes('disabled')).toBeDefined()
  })

  it('does not emit when decrementing at min', async () => {
    const wrapper = mount(CounterInput, {
      props: { modelValue: 1, min: 1 },
    })
    const minusBtn = wrapper.findAll('button')[0]!
    await minusBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('does not emit when incrementing at max', async () => {
    const wrapper = mount(CounterInput, {
      props: { modelValue: 5, max: 5 },
    })
    const plusBtn = wrapper.findAll('button')[1]!
    await plusBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('has a11y group role and labels', () => {
    const wrapper = mount(CounterInput, {
      props: { modelValue: 1 },
    })
    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.attributes('aria-label')).toBe('Количество')
  })
})
