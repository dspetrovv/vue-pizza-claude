import { describe, it, expect } from 'vitest'
import { navItems, footerLinks } from '@/data/navigation'

describe('navigation data', () => {
  it('navItems is non-empty array', () => {
    expect(navItems.length).toBeGreaterThan(0)
  })

  it('navItems have label and value', () => {
    for (const item of navItems) {
      expect(item.label).toBeTruthy()
      expect(item.value).toBeTruthy()
    }
  })

  it('footerLinks is non-empty array', () => {
    expect(footerLinks.length).toBeGreaterThan(0)
  })

  it('footerLinks have label and href', () => {
    for (const link of footerLinks) {
      expect(link.label).toBeTruthy()
      expect(link.href).toBeTruthy()
    }
  })
})
