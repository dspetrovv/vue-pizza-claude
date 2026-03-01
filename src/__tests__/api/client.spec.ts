import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiClient, ApiError } from '@/api/client'

describe('ApiError', () => {
  it('creates error with status and statusText', () => {
    const error = new ApiError(404, 'Not Found')
    expect(error).toBeInstanceOf(Error)
    expect(error.name).toBe('ApiError')
    expect(error.status).toBe(404)
    expect(error.statusText).toBe('Not Found')
    expect(error.message).toBe('404 Not Found')
  })

  it('accepts custom message', () => {
    const error = new ApiError(500, 'Internal Server Error', 'Something went wrong')
    expect(error.message).toBe('Something went wrong')
    expect(error.status).toBe(500)
  })
})

describe('apiClient', () => {
  let mockFetch: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockFetch = vi.fn()
    vi.stubGlobal('fetch', mockFetch)
    localStorage.clear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sends GET request by default', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: 'test' }),
    })

    await apiClient('/test')

    expect(mockFetch).toHaveBeenCalledTimes(1)
    const callArgs = mockFetch.mock.calls[0]!
    expect(callArgs[0]).toContain('/test')
    expect(callArgs[1].method).toBe('GET')
  })

  it('sends JSON body for POST requests', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: '1' }),
    })

    const payload = { name: 'Test' }
    await apiClient('/items', { method: 'POST', body: payload })

    const callArgs = mockFetch.mock.calls[0]!
    const fetchOptions = callArgs[1]
    expect(fetchOptions.method).toBe('POST')
    expect(fetchOptions.body).toBe(JSON.stringify(payload))
    expect(fetchOptions.headers).toHaveProperty('Content-Type', 'application/json')
  })

  it('includes Authorization header when token exists', async () => {
    localStorage.setItem('auth_token', 'test-token-123')

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    })

    await apiClient('/secured')

    const callArgs = mockFetch.mock.calls[0]!
    const fetchOptions = callArgs[1]
    expect(fetchOptions.headers).toHaveProperty('Authorization', 'Bearer test-token-123')
  })

  it('omits Authorization header when no token', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    })

    await apiClient('/public')

    const callArgs = mockFetch.mock.calls[0]!
    const fetchOptions = callArgs[1]
    expect(fetchOptions.headers).not.toHaveProperty('Authorization')
  })

  it('throws ApiError on non-ok response', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    })

    await expect(apiClient('/missing')).rejects.toThrow(ApiError)
  })

  it('throws ApiError with correct status', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    })

    try {
      await apiClient('/fail')
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError)
      expect((e as ApiError).status).toBe(500)
    }
  })

  it('returns parsed JSON on success', async () => {
    const data = { items: [1, 2, 3] }
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    })

    const result = await apiClient<typeof data>('/items')
    expect(result).toEqual(data)
  })

  it('does not send body for GET requests', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    })

    await apiClient('/test')

    const callArgs = mockFetch.mock.calls[0]!
    expect(callArgs[1].body).toBeUndefined()
  })
})
