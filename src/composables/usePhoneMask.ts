import { ref, computed } from 'vue'

/**
 * Composable for Russian phone number input mask.
 * Format: +7 (XXX) XXX-XX-XX
 * Accepts only digits, auto-formats on input.
 */
export function usePhoneMask() {
  /** Raw subscriber digits (without country code), max 10 */
  const digits = ref('')

  /** Formatted display value */
  const formatted = computed(() => {
    const d = digits.value
    if (!d) return ''

    let result = '+7'

    if (d.length > 0) {
      result += ' (' + d.slice(0, 3)
    }
    if (d.length >= 3) {
      result += ') ' + d.slice(3, 6)
    }
    if (d.length > 6) {
      result += '-' + d.slice(6, 8)
    }
    if (d.length > 8) {
      result += '-' + d.slice(8, 10)
    }

    return result
  })

  /** Whether the phone number is complete (10 subscriber digits) */
  const isComplete = computed(() => digits.value.length === 10)

  /**
   * Input handler — extracts digits from any input value,
   * strips the country code (7/8), and limits to 10 digits.
   * Use as: @update:model-value="onInput"
   */
  function onInput(value: string | number): void {
    let raw = String(value).replace(/\D/g, '')

    // The formatted display always starts with "+7",
    // so extracted digits always contain a leading "7" from the prefix.
    // Also handle cases where user pastes full number with 8 prefix.
    if (raw.startsWith('7') || raw.startsWith('8')) {
      raw = raw.slice(1)
    }

    digits.value = raw.slice(0, 10)
  }

  return { digits, formatted, onInput, isComplete }
}
