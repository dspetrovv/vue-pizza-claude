<script setup lang="ts">
const sidebarTitleId = `sidebar-title-${Math.random().toString(36).slice(2, 9)}`

interface AppSidebarProps {
  modelValue: boolean
  title?: string
}

withDefaults(defineProps<AppSidebarProps>(), {
  title: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function close() {
  emit('update:modelValue', false)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    close()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="sidebar">
      <div v-if="modelValue" class="app-sidebar-overlay" @mousedown.self="close" @keydown="onKeydown">
        <div class="app-sidebar" role="dialog" aria-modal="true" :aria-labelledby="title ? sidebarTitleId : undefined">
          <div class="app-sidebar__header">
            <h2 v-if="title" :id="sidebarTitleId" class="app-sidebar__title">{{ title }}</h2>
            <slot name="header" />
            <button type="button" class="app-sidebar__close" aria-label="Закрыть" @click="close">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <div class="app-sidebar__body">
            <slot />
          </div>

          <div v-if="$slots.footer" class="app-sidebar__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.app-sidebar-overlay {
  position: fixed;
  inset: 0;
  z-index: $z-overlay;
  display: flex;
  justify-content: flex-end;
  background-color: rgba($color-black, 0.3);
  backdrop-filter: blur(4px);
}

.app-sidebar {
  display: flex;
  flex-direction: column;
  width: 400px;
  max-width: 100%;
  height: 100%;
  background-color: $color-white;
  box-shadow: $shadow-lg;

  &__header {
    display: flex;
    align-items: center;
    gap: $spacing-16;
    padding: $spacing-20 $spacing-24;
    border-bottom: 1px solid $color-border;
    flex-shrink: 0;
  }

  &__title {
    flex: 1;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text;
  }

  &__close {
    @include flex-center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: $color-text-secondary;
    cursor: pointer;
    transition: background-color $transition-fast, color $transition-fast;
    flex-shrink: 0;

    &:hover {
      background-color: $color-bg-secondary;
      color: $color-text;
    }
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: $spacing-24;
  }

  &__footer {
    padding: $spacing-16 $spacing-24;
    border-top: 1px solid $color-border;
    flex-shrink: 0;
  }
}

// ── Transitions ──
.sidebar-enter-active,
.sidebar-leave-active {
  transition: background-color $transition-base, backdrop-filter $transition-base;

  .app-sidebar {
    transition: transform $transition-base;
  }
}

.sidebar-enter-from,
.sidebar-leave-to {
  background-color: rgba($color-black, 0);
  backdrop-filter: blur(0);

  .app-sidebar {
    transform: translateX(100%);
  }
}
</style>
