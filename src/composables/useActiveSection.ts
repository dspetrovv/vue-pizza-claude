import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Tracks which section is currently visible in the viewport
 * using IntersectionObserver. Returns the `id` of the most
 * visible section and a helper to scroll to a section.
 *
 * @param sectionIds - list of DOM element ids to observe
 * @param options - rootMargin to fine-tune activation zone
 */
export function useActiveSection(
  sectionIds: string[],
  options: { rootMargin?: string; threshold?: number } = {},
) {
  const activeId = ref(sectionIds[0] ?? '')

  let observer: IntersectionObserver | null = null
  const ratioMap = new Map<string, number>()

  function updateActive() {
    let bestId = ''
    let bestRatio = 0

    for (const [id, ratio] of ratioMap) {
      if (ratio > bestRatio) {
        bestRatio = ratio
        bestId = id
      }
    }

    if (bestId) {
      activeId.value = bestId
    }
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratioMap.set(entry.target.id, entry.intersectionRatio)
        }
        updateActive()
      },
      {
        rootMargin: options.rootMargin ?? '-80px 0px -40% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
      }
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
    ratioMap.clear()
  })

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return

    const headerHeight = 80
    const y = el.getBoundingClientRect().top + window.scrollY - headerHeight

    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return { activeId, scrollTo }
}
