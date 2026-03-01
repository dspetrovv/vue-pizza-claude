import { describe, it, expect, vi, beforeEach } from 'vitest'

// Must be tested within a Vue component lifecycle context since it uses onMounted
import { mount } from '@vue/test-utils'
import { defineComponent, toRef } from 'vue'
import { useActiveSection } from '@/composables/useActiveSection'

function createTestComponent(sectionIds: string[]) {
  return defineComponent({
    setup() {
      const { activeId, scrollTo } = useActiveSection(sectionIds)
      return { activeId, scrollTo }
    },
    template: '<div />',
  })
}

describe('useActiveSection', () => {
  beforeEach(() => {
    // Create section elements
    document.body.innerHTML = `
      <div id="section-1" style="height:200px">Section 1</div>
      <div id="section-2" style="height:200px">Section 2</div>
      <div id="section-3" style="height:200px">Section 3</div>
    `
  })

  it('initializes with first section as active', () => {
    const ids = ['section-1', 'section-2', 'section-3']
    const Component = createTestComponent(ids)
    const wrapper = mount(Component)

    expect(wrapper.vm.activeId).toBe('section-1')
  })

  it('provides scrollTo function', () => {
    const ids = ['section-1', 'section-2', 'section-3']
    const Component = createTestComponent(ids)
    const wrapper = mount(Component)

    expect(typeof wrapper.vm.scrollTo).toBe('function')
  })

  it('scrollTo calls window.scrollTo', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo')
    const ids = ['section-1', 'section-2', 'section-3']
    const Component = createTestComponent(ids)
    const wrapper = mount(Component)

    wrapper.vm.scrollTo('section-2')
    expect(scrollToSpy).toHaveBeenCalled()
  })

  it('handles empty sections list', () => {
    const Component = createTestComponent([])
    const wrapper = mount(Component)
    expect(wrapper.vm.activeId).toBe('')
  })

  it('cleans up on unmount', () => {
    const ids = ['section-1', 'section-2']
    const Component = createTestComponent(ids)
    const wrapper = mount(Component)

    // Should not throw
    wrapper.unmount()
  })
})
