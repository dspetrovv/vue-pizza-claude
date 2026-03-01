export interface AppConfig {
  apiMode: 'mock' | 'real'
  apiBaseUrl: string
}

export const config: AppConfig = {
  apiMode: (import.meta.env.VITE_API_MODE as AppConfig['apiMode']) ?? 'mock',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api',
}

export function isMockMode(): boolean {
  return config.apiMode === 'mock'
}
