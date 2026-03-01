import { describe, it, expect } from 'vitest'
import { usePhoneMask } from '@/composables/usePhoneMask'

describe('usePhoneMask', () => {
  it('starts with empty state', () => {
    const { digits, formatted, isComplete } = usePhoneMask()

    expect(digits.value).toBe('')
    expect(formatted.value).toBe('')
    expect(isComplete.value).toBe(false)
  })

  it('formats partial phone number', () => {
    const { formatted, onInput } = usePhoneMask()

    onInput('79991')
    expect(formatted.value).toBe('+7 (999) 1')
  })

  it('formats 3-digit number with area code', () => {
    const { formatted, onInput } = usePhoneMask()

    onInput('7999')
    // 3 digits fills area code, closing paren + space appended (d.slice(3,6) is empty)
    expect(formatted.value).toBe('+7 (999) ')
  })

  it('formats full 10-digit subscriber number', () => {
    const { formatted, onInput, isComplete } = usePhoneMask()

    onInput('79991234567')
    expect(formatted.value).toBe('+7 (999) 123-45-67')
    expect(isComplete.value).toBe(true)
  })

  it('strips country code 7', () => {
    const { digits, onInput } = usePhoneMask()

    onInput('79991234567')
    expect(digits.value).toBe('9991234567')
  })

  it('strips country code 8', () => {
    const { digits, onInput } = usePhoneMask()

    onInput('89991234567')
    expect(digits.value).toBe('9991234567')
  })

  it('strips non-digit characters', () => {
    const { digits, onInput } = usePhoneMask()

    onInput('+7 (999) 123-45-67')
    expect(digits.value).toBe('9991234567')
  })

  it('limits to 10 digits', () => {
    const { digits, onInput } = usePhoneMask()

    onInput('999123456789999')
    expect(digits.value.length).toBe(10)
  })

  it('isComplete is false for incomplete numbers', () => {
    const { isComplete, onInput } = usePhoneMask()

    onInput('799912')
    expect(isComplete.value).toBe(false)
  })

  it('handles numeric input type', () => {
    const { digits, onInput } = usePhoneMask()

    onInput(79991234567)
    expect(digits.value).toBe('9991234567')
  })

  it('formats progressively as digits are added', () => {
    const { formatted, onInput } = usePhoneMask()

    onInput('79')
    expect(formatted.value).toBe('+7 (9')

    onInput('7999')
    expect(formatted.value).toBe('+7 (999) ')

    onInput('7999123')
    expect(formatted.value).toBe('+7 (999) 123')

    onInput('79991234')
    expect(formatted.value).toBe('+7 (999) 123-4')

    onInput('799912345')
    expect(formatted.value).toBe('+7 (999) 123-45')

    onInput('7999123456')
    expect(formatted.value).toBe('+7 (999) 123-45-6')

    onInput('79991234567')
    expect(formatted.value).toBe('+7 (999) 123-45-67')
  })
})
