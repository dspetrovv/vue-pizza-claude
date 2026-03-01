import { describe, it, expect } from 'vitest'
import { formatPrice } from '@/utils/format'

describe('formatPrice', () => {
  it('formats small numbers without separator', () => {
    expect(formatPrice(0)).toBe('0')
    expect(formatPrice(5)).toBe('5')
    expect(formatPrice(999)).toBe('999')
  })

  it('formats thousands with space separator', () => {
    // Russian locale uses non-breaking space (\u00A0) as thousands separator
    const result = formatPrice(2379)
    expect(result).toMatch(/2\s?379/)
  })

  it('formats large numbers', () => {
    const result = formatPrice(1234567)
    expect(result).toMatch(/1\s?234\s?567/)
  })

  it('handles negative numbers', () => {
    const result = formatPrice(-500)
    expect(result).toContain('500')
  })
})
