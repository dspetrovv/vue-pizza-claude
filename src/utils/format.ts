/**
 * Format a number with space as thousands separator (Russian locale).
 * Example: 2379 → "2 379"
 */
export function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU')
}
