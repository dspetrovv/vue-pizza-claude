import { describe, it, expect } from 'vitest'
import { config, isMockMode } from '@/config'

describe('config', () => {
  it('has apiMode property', () => {
    expect(config).toHaveProperty('apiMode')
    expect(['mock', 'real']).toContain(config.apiMode)
  })

  it('has apiBaseUrl property', () => {
    expect(config).toHaveProperty('apiBaseUrl')
    expect(typeof config.apiBaseUrl).toBe('string')
  })
})

describe('isMockMode', () => {
  it('returns boolean', () => {
    expect(typeof isMockMode()).toBe('boolean')
  })

  it('returns true when apiMode is mock', () => {
    // Default config is mock
    expect(config.apiMode).toBe('mock')
    expect(isMockMode()).toBe(true)
  })
})
