<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import OrderHistoryTab from '@/pages/OrderHistoryTab.vue'
import SettingsTab from '@/pages/SettingsTab.vue'

const activeTab = ref<'history' | 'settings'>('history')
const activeComponent = shallowRef(OrderHistoryTab)

function setTab(tab: 'history' | 'settings') {
  activeTab.value = tab
  activeComponent.value = tab === 'history' ? OrderHistoryTab : SettingsTab
}
</script>

<template>
  <main class="account-page">
    <div class="account-page__container">
      <h1 class="account-page__title">Мой аккаунт</h1>

      <div class="account-page__tabs" role="tablist" aria-label="Разделы аккаунта">
        <AppButton
          role="tab"
          :aria-selected="activeTab === 'history'"
          aria-controls="tab-panel-history"
          :variant="activeTab === 'history' ? 'primary' : 'outline'"
          @click="setTab('history')"
        >
          История заказов
        </AppButton>
        <AppButton
          role="tab"
          :aria-selected="activeTab === 'settings'"
          aria-controls="tab-panel-settings"
          :variant="activeTab === 'settings' ? 'primary' : 'outline'"
          @click="setTab('settings')"
        >
          Настройки
        </AppButton>
      </div>

      <div :id="`tab-panel-${activeTab}`" role="tabpanel" :aria-label="activeTab === 'history' ? 'История заказов' : 'Настройки'">
        <KeepAlive>
          <component :is="activeComponent" />
        </KeepAlive>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.account-page {
  @include container;
  padding-top: $spacing-32;
  padding-bottom: $spacing-64;

  &__container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: $spacing-24;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text;
  }

  &__tabs {
    display: flex;
    gap: $spacing-8;
  }

  @include media-down($breakpoint-sm) {
    &__title {
      font-size: $font-size-lg;
    }

    &__tabs {
      > * {
        flex: 1;
      }
    }
  }
}
</style>
