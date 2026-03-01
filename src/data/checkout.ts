import type { TimeOption, Restaurant, SuggestionProduct } from '@/types/checkout'

export const timeOptions: TimeOption[] = [
  { label: '12:00', value: '12:00' },
  { label: '12:30', value: '12:30' },
  { label: '13:00', value: '13:00' },
  { label: '13:30', value: '13:30' },
  { label: '14:00', value: '14:00' },
  { label: '14:30', value: '14:30' },
  { label: '15:00', value: '15:00' },
  { label: '15:30', value: '15:30' },
]

export const suggestions: SuggestionProduct[] = [
  { id: 's1', name: 'Картофель из печи', price: 179, portion: 'Порция 95 г', emoji: '🍟' },
  { id: 's2', name: 'Филадельфия крем-брюле', price: 179, portion: 'Порция 95 г', emoji: '🍣' },
  { id: 's3', name: 'Супер Филадельфия', price: 179, portion: 'Порция 95 г', emoji: '🍣' },
  { id: 's4', name: 'Тигр мама', price: 179, portion: 'Порция 95 г', emoji: '🌯' },
  { id: 's5', name: 'Сырные палочки', price: 149, portion: 'Порция 80 г', emoji: '🧀' },
  { id: 's6', name: 'Куриные наггетсы', price: 169, portion: 'Порция 100 г', emoji: '🍗' },
]

export const restaurantOptions: Restaurant[] = [
  { label: 'Ресторан на Пушкина', value: 'pushkina' },
  { label: 'Ресторан на Ленина', value: 'lenina' },
  { label: 'Ресторан на Гагарина', value: 'gagarina' },
]
