import type { CartItemData } from '@/types/cart'

export const initialCartItems: CartItemData[] = [
  {
    id: 'pepperoni-po-derevenski-traditional-28',
    name: 'Пепперони по-деревенски',
    description: 'Традиционное тесто, 28 см',
    price: 399,
    quantity: 2,
    emoji: '🍕',
  },
  {
    id: 'chetyre-syra-traditional-33',
    name: 'Четыре сыра',
    description: 'Традиционное тесто, 33 см',
    price: 499,
    quantity: 1,
    emoji: '🍕',
  },
  {
    id: 'gavayskaya-thin-28',
    name: 'Гавайская',
    description: 'Тонкое тесто, 28 см',
    price: 449,
    quantity: 1,
    emoji: '🍕',
  },
  {
    id: 'филадельфия',
    name: 'Филадельфия',
    description: '',
    price: 389,
    quantity: 2,
    emoji: '🍣',
  },
  {
    id: 'картофель-из-печи',
    name: 'Картофель из печи',
    description: '',
    price: 179,
    quantity: 1,
    emoji: '🍟',
  },
  {
    id: 'кока-кола',
    name: 'Кока-Кола',
    description: '',
    price: 99,
    quantity: 3,
    emoji: '🥤',
  },
]
