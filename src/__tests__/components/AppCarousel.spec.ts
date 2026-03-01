import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppCarousel from '@/components/ui/AppCarousel.vue'

describe('AppCarousel', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppCarousel, {
      slots: {
        default: '<div class="card">Card 1</div><div class="card">Card 2</div>',
      },
    })
    expect(wrapper.findAll('.card').length).toBe(2)
  })

  it('has track element', () => {
    const wrapper = mount(AppCarousel, {
      slots: { default: '<div>Item</div>' },
    })
    expect(wrapper.find('.app-carousel__track').exists()).toBe(true)
  })

  it('has nav buttons with aria-labels', () => {
    const wrapper = mount(AppCarousel, {
      slots: { default: '<div>Item</div>' },
    })
    const prevBtn = wrapper.find('.app-carousel__btn--prev')
    const nextBtn = wrapper.find('.app-carousel__btn--next')
    expect(prevBtn.attributes('aria-label')).toBe('Назад')
    expect(nextBtn.attributes('aria-label')).toBe('Вперёд')
  })
})
