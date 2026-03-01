import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IngredientCard from '@/components/ui/IngredientCard.vue'

describe('IngredientCard', () => {
  it('renders name', () => {
    const wrapper = mount(IngredientCard, {
      props: { name: 'Моцарелла', emoji: '🧀' },
    })
    expect(wrapper.find('.ingredient-card__name').text()).toBe('Моцарелла')
  })

  it('renders emoji', () => {
    const wrapper = mount(IngredientCard, {
      props: { name: 'Моцарелла', emoji: '🧀' },
    })
    expect(wrapper.find('.ingredient-card__emoji').text()).toBe('🧀')
  })

  it('renders price when provided', () => {
    const wrapper = mount(IngredientCard, {
      props: { name: 'Сыр', price: 79, variant: 'addon' },
    })
    expect(wrapper.find('.ingredient-card__price').text()).toContain('79')
    expect(wrapper.find('.ingredient-card__price').text()).toContain('₽')
  })

  it('does not render price when not provided', () => {
    const wrapper = mount(IngredientCard, {
      props: { name: 'Соус', variant: 'base' },
    })
    expect(wrapper.find('.ingredient-card__price').exists()).toBe(false)
  })

  it('applies selected class for addon variant', () => {
    const wrapper = mount(IngredientCard, {
      props: { name: 'Сыр', selected: true, variant: 'addon' },
    })
    expect(wrapper.classes()).toContain('ingredient-card--selected')
  })

  it('applies removed class for base variant when not selected', () => {
    const wrapper = mount(IngredientCard, {
      props: { name: 'Лук', selected: false, variant: 'base' },
    })
    expect(wrapper.classes()).toContain('ingredient-card--removed')
  })

  it('applies included class for base variant when selected', () => {
    const wrapper = mount(IngredientCard, {
      props: { name: 'Лук', selected: true, variant: 'base' },
    })
    expect(wrapper.classes()).toContain('ingredient-card--included')
  })

  it('shows check badge for selected addon', () => {
    const wrapper = mount(IngredientCard, {
      props: { name: 'Сыр', selected: true, variant: 'addon' },
    })
    expect(wrapper.find('.ingredient-card__badge--check').exists()).toBe(true)
  })

  it('shows remove badge for excluded base ingredient', () => {
    const wrapper = mount(IngredientCard, {
      props: { name: 'Лук', selected: false, variant: 'base' },
    })
    expect(wrapper.find('.ingredient-card__badge--remove').exists()).toBe(true)
  })

  it('emits toggle on click', async () => {
    const wrapper = mount(IngredientCard, {
      props: { name: 'Сыр' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  it('has aria-pressed attribute', () => {
    const wrapper = mount(IngredientCard, {
      props: { name: 'Сыр', selected: true },
    })
    expect(wrapper.attributes('aria-pressed')).toBe('true')
  })
})
