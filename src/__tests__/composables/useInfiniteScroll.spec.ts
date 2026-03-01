import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'

function createTestComponent(onLoadMore: () => Promise<void>) {
  return defineComponent({
    setup() {
      const { isLoading, isFinished, startLoading, endLoading, reset } =
        useInfiniteScroll('scroll-sentinel', onLoadMore)
      return { isLoading, isFinished, startLoading, endLoading, reset }
    },
    template: '<div><div ref="scroll-sentinel" /></div>',
  })
}

describe('useInfiniteScroll', () => {
  it('starts with isLoading=false and isFinished=false', () => {
    const loadMore = async () => {}
    const Component = createTestComponent(loadMore)
    const wrapper = mount(Component)

    expect(wrapper.vm.isLoading).toBe(false)
    expect(wrapper.vm.isFinished).toBe(false)
  })

  it('startLoading sets isLoading to true', () => {
    const loadMore = async () => {}
    const Component = createTestComponent(loadMore)
    const wrapper = mount(Component)

    wrapper.vm.startLoading()
    expect(wrapper.vm.isLoading).toBe(true)
  })

  it('endLoading sets isLoading to false', () => {
    const loadMore = async () => {}
    const Component = createTestComponent(loadMore)
    const wrapper = mount(Component)

    wrapper.vm.startLoading()
    wrapper.vm.endLoading()
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('endLoading(true) sets isFinished', () => {
    const loadMore = async () => {}
    const Component = createTestComponent(loadMore)
    const wrapper = mount(Component)

    wrapper.vm.startLoading()
    wrapper.vm.endLoading(true)
    expect(wrapper.vm.isLoading).toBe(false)
    expect(wrapper.vm.isFinished).toBe(true)
  })

  it('reset clears state', () => {
    const loadMore = async () => {}
    const Component = createTestComponent(loadMore)
    const wrapper = mount(Component)

    wrapper.vm.startLoading()
    wrapper.vm.endLoading(true)
    wrapper.vm.reset()
    expect(wrapper.vm.isLoading).toBe(false)
    expect(wrapper.vm.isFinished).toBe(false)
  })

  it('cleans up observer on unmount', () => {
    const loadMore = async () => {}
    const Component = createTestComponent(loadMore)
    const wrapper = mount(Component)

    // Should not throw
    wrapper.unmount()
  })
})
