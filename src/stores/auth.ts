import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

export interface AuthUser {
  phone: string
  name: string
  email: string
}

/**
 * Fake JWT auth store.
 * Emulates token-based authentication without a real backend.
 * Token and user data are persisted in localStorage.
 */
export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const user = ref<AuthUser | null>(restoreUser())

  const isAuthenticated = computed(() => !!token.value)
  const hasCompleteProfile = computed(() => {
    if (!user.value) return false
    return !!(user.value.name.trim() && user.value.phone.trim() && user.value.email.trim())
  })

  function restoreUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as AuthUser
    } catch {
      return null
    }
  }

  /** Generate a fake JWT-like token */
  function generateFakeToken(phone: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(JSON.stringify({
      sub: phone,
      iat: Date.now(),
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    }))
    const signature = btoa(`fake-signature-${phone}-${Date.now()}`)
    return `${header}.${payload}.${signature}`
  }

  function login(phone: string): void {
    const fakeToken = generateFakeToken(phone)
    const userData: AuthUser = { phone, name: '', email: '' }

    token.value = fakeToken
    user.value = userData

    localStorage.setItem(TOKEN_KEY, fakeToken)
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
  }

  function updateProfile(data: Partial<Pick<AuthUser, 'name' | 'email' | 'phone'>>): void {
    if (!user.value) return
    Object.assign(user.value, data)
    localStorage.setItem(USER_KEY, JSON.stringify(user.value))
  }

  function logout(): void {
    token.value = null
    user.value = null

    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return {
    token,
    user,
    isAuthenticated,
    hasCompleteProfile,
    login,
    updateProfile,
    logout,
  }
})
