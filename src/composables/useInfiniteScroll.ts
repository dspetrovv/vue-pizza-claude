import { ref, onMounted, onUnmounted, useTemplateRef, type Ref } from 'vue'

interface UseInfiniteScrollOptions {
  /** Root margin for IntersectionObserver (e.g. '200px' to trigger earlier) */
  rootMargin?: string
  /** Intersection threshold (0–1) */
  threshold?: number
}

interface UseInfiniteScrollReturn {
  /** Whether a load is currently in progress */
  isLoading: Ref<boolean>
  /** Whether all data has been loaded */
  isFinished: Ref<boolean>
  /** Call when loading starts (set automatically if using `onLoadMore`) */
  startLoading: () => void
  /** Call when loading ends; pass `true` if no more data */
  endLoading: (finished?: boolean) => void
  /** Reset state for a fresh start */
  reset: () => void
}

export function useInfiniteScroll(
  sentinelKey: string,
  onLoadMore: () => Promise<void>,
  options: UseInfiniteScrollOptions = {},
): UseInfiniteScrollReturn {
  const { rootMargin = '200px', threshold = 0 } = options

  const sentinel = useTemplateRef<HTMLElement>(sentinelKey)
  const isLoading = ref(false)
  const isFinished = ref(false)

  let observer: IntersectionObserver | null = null

  function startLoading() {
    isLoading.value = true
  }

  function endLoading(finished = false) {
    isLoading.value = false
    if (finished) {
      isFinished.value = true
    }
  }

  function reset() {
    isLoading.value = false
    isFinished.value = false
  }

  async function handleIntersection(entries: IntersectionObserverEntry[]) {
    const entry = entries[0]
    if (!entry?.isIntersecting) return
    if (isLoading.value || isFinished.value) return

    isLoading.value = true
    try {
      await onLoadMore()
    } finally {
      // onLoadMore should call endLoading, but ensure isLoading resets
      if (isLoading.value) {
        isLoading.value = false
      }
    }
  }

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold,
    })

    if (sentinel.value) {
      observer.observe(sentinel.value)
    }
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    isLoading,
    isFinished,
    startLoading,
    endLoading,
    reset,
  }
}
