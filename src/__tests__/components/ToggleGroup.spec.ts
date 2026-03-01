import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToggleGroup from '@/components/ui/ToggleGroup.vue'

const options = [
  { label: 'Тонкое', value: 'thin' },
  { label: 'Традиционное', value: 'traditional' },
]

describe('ToggleGroup', () => {
  it('renders all options', () => {
    const wrapper = mount(ToggleGroup, {
      props: { options, modelValue: 'thin' },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)
    expect(buttons[0]!.text()).toBe('Тонкое')
    expect(buttons[1]!.text()).toBe('Традиционное')
  })

  it('marks active option', () => {
    const wrapper = mount(ToggleGroup, {
      props: { options, modelValue: 'thin' },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons[0]!.classes()).toContain('toggle-group__item--active')
    expect(buttons[1]!.classes()).not.toContain('toggle-group__item--active')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(ToggleGroup, {
      props: { options, modelValue: 'thin' },
    })
    await wrapper.findAll('button')[1]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([['traditional']])
  })

  it('sets aria-pressed on active', () => {
    const wrapper = mount(ToggleGroup, {
      props: { options, modelValue: 'traditional' },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons[0]!.attributes('aria-pressed')).toBe('false')
    expect(buttons[1]!.attributes('aria-pressed')).toBe('true')
  })

  it('applies aria-label from prop', () => {
    const wrapper = mount(ToggleGroup, {
      props: { options, modelValue: 'thin', ariaLabel: 'Тесто' },
    })
    expect(wrapper.attributes('aria-label')).toBe('Тесто')
  })
})
