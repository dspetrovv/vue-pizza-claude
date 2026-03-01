import type { NavItem, FooterLink } from '@/types/navigation'

export const navItems: NavItem[] = [
  { label: 'Акции', value: 'sales' },
  { label: 'Пицца', value: 'pizza' },
  { label: 'Суши', value: 'sushi' },
  { label: 'Напитки', value: 'drinks' },
  { label: 'Закуски', value: 'snacks' },
  { label: 'Комбо', value: 'combo' },
  { label: 'Десерты', value: 'desserts' },
  { label: 'Соусы', value: 'sauces' },
]

export const footerLinks: FooterLink[] = [
  { label: 'Политика конфиденциальности', href: '#' },
  { label: 'Условия доставки', href: '#' },
]
