import { isMockMode } from '@/config'
import { apiClient } from '@/api/client'
import * as mockData from '@/data/catalog'
import type { CatalogData } from '@/types/catalog'

export async function getCatalog(): Promise<CatalogData> {
  if (isMockMode()) {
    return {
      filterGroups: mockData.filterGroups,
      pizzaDoughOptions: mockData.pizzaDoughOptions,
      pizzaSizeOptions: mockData.pizzaSizeOptions,
      pizzas: mockData.pizzas,
      sales: mockData.sales,
      sushi: mockData.sushi,
      drinks: mockData.drinks,
      snacks: mockData.snacks,
      combo: mockData.combo,
      desserts: mockData.desserts,
      sauces: mockData.sauces,
    }
  }

  return apiClient<CatalogData>('/catalog')
}
