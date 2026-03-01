import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTag from '@/components/ui/AppTag.vue'

describe('AppTag', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppTag, {
      slots: { default: 'Хит' },
    })
    expect(wrapper.text()).toBe('Хит')
  })

  it('applies filled variant by default', () => {
    const wrapper = mount(AppTag, {
      slots: { default: 'Tag' },
    })
    expect(wrapper.classes()).toContain('app-tag--filled')
  })

  it('applies outline variant', () => {
    const wrapper = mount(AppTag, {
      props: { variant: 'outline' },
      slots: { default: 'Tag' },
    })
    expect(wrapper.classes()).toContain('app-tag--outline')
  })

  it('applies sm size by default', () => {
    const wrapper = mount(AppTag, {
      slots: { default: 'Tag' },
    })
    expect(wrapper.classes()).toContain('app-tag--sm')
  })

  it('applies md size', () => {
    const wrapper = mount(AppTag, {
      props: { size: 'md' },
      slots: { default: 'Tag' },
    })
    expect(wrapper.classes()).toContain('app-tag--md')
  })
})
