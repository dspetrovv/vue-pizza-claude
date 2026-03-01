import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

describe('useAuthStore', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('starts unauthenticated when no token in localStorage', () => {
    const auth = useAuthStore()
    expect(auth.isAuthenticated).toBe(false)
    expect(auth.token).toBeNull()
    expect(auth.user).toBeNull()
  })

  it('login sets token and user', () => {
    const auth = useAuthStore()
    auth.login('+79991234567')

    expect(auth.isAuthenticated).toBe(true)
    expect(auth.token).toBeTruthy()
    expect(auth.user).not.toBeNull()
    expect(auth.user!.phone).toBe('+79991234567')
    expect(auth.user!.name).toBe('')
  })

  it('login generates JWT-like token', () => {
    const auth = useAuthStore()
    auth.login('+79991234567')

    // JWT format: header.payload.signature (3 parts separated by dots)
    const parts = auth.token!.split('.')
    expect(parts.length).toBe(3)
  })

  it('login persists to localStorage', () => {
    const auth = useAuthStore()
    auth.login('+79991234567')

    expect(localStorage.getItem('auth_token')).toBe(auth.token)
    expect(localStorage.getItem('auth_user')).toBeTruthy()

    const storedUser = JSON.parse(localStorage.getItem('auth_user')!)
    expect(storedUser.phone).toBe('+79991234567')
  })

  it('logout clears state and localStorage', () => {
    const auth = useAuthStore()
    auth.login('+79991234567')
    auth.logout()

    expect(auth.isAuthenticated).toBe(false)
    expect(auth.token).toBeNull()
    expect(auth.user).toBeNull()
    expect(localStorage.getItem('auth_token')).toBeNull()
    expect(localStorage.getItem('auth_user')).toBeNull()
  })

  it('restores state from localStorage on init', () => {
    // Simulate previously saved data
    const fakeToken = 'saved.token.here'
    const fakeUser = { phone: '+79997654321', name: 'Test' }
    localStorage.setItem('auth_token', fakeToken)
    localStorage.setItem('auth_user', JSON.stringify(fakeUser))

    const auth = useAuthStore()
    expect(auth.token).toBe(fakeToken)
    expect(auth.isAuthenticated).toBe(true)
    expect(auth.user).toEqual(fakeUser)
  })

  it('handles corrupted user data gracefully', () => {
    localStorage.setItem('auth_token', 'some-token')
    localStorage.setItem('auth_user', 'not-valid-json')

    const auth = useAuthStore()
    expect(auth.token).toBe('some-token')
    expect(auth.user).toBeNull()
  })
})
