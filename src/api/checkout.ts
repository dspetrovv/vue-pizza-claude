import { isMockMode } from '@/config'
import { apiClient } from '@/api/client'
import {
  timeOptions as mockTimeOptions,
  suggestions as mockSuggestions,
  restaurantOptions as mockRestaurants,
} from '@/data/checkout'
import type { TimeOption, Restaurant, SuggestionProduct } from '@/types/checkout'

export async function getTimeSlots(): Promise<TimeOption[]> {
  if (isMockMode()) {
    return mockTimeOptions
  }

  return apiClient<TimeOption[]>('/checkout/time-slots')
}

export async function getSuggestions(): Promise<SuggestionProduct[]> {
  if (isMockMode()) {
    return mockSuggestions
  }

  return apiClient<SuggestionProduct[]>('/checkout/suggestions')
}

export async function getRestaurants(): Promise<Restaurant[]> {
  if (isMockMode()) {
    return mockRestaurants
  }

  return apiClient<Restaurant[]>('/checkout/restaurants')
}
