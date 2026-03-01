<script setup lang="ts">
import { ref } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCheckbox from '@/components/ui/AppCheckbox.vue'
import { usePhoneMask } from '@/composables/usePhoneMask'

// ── Personal data ──
const customerName = ref('Вадим')
const { formatted: phoneFormatted, onInput: phoneOnInput } = usePhoneMask()
const customerEmail = ref('mail@gmail.com')
const birthDate = ref('1996-02-13')

// ── Password ──
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// ── Subscriptions ──
const subOffers = ref(true)
</script>

<template>
  <div class="settings-tab">
    <!-- Изменение личных данных -->
    <div class="settings-tab__card">
      <h2 class="settings-tab__heading">Изменение личных данных</h2>

      <div class="settings-tab__row settings-tab__row--3">
        <AppInput v-model="customerName" label="Имя*" placeholder="Имя" />
        <AppInput
          :model-value="phoneFormatted"
          label="Номер телефона*"
          placeholder="+7 (___) ___-__-__"
          type="tel"
          digits-only
          :max-length="18"
          @update:model-value="phoneOnInput"
        />
        <AppInput v-model="customerEmail" label="Почта" placeholder="Почта" type="email" />
      </div>

      <div class="settings-tab__row settings-tab__row--3">
        <AppInput v-model="birthDate" label="Дата рождения" placeholder="ДД.ММ.ГГГГ" type="date" />
      </div>

      <AppButton variant="primary" class="settings-tab__action">
        Сохранить изменения
      </AppButton>
    </div>

    <!-- Изменить пароль -->
    <div class="settings-tab__card">
      <h2 class="settings-tab__heading">Изменить пароль</h2>

      <div class="settings-tab__row settings-tab__row--3">
        <AppInput v-model="oldPassword" label="Старый пароль*" placeholder="Старый пароль" type="password" />
        <AppInput v-model="newPassword" label="Новый пароль*" placeholder="Новый пароль" type="password" />
        <AppInput v-model="confirmPassword" label="Подтвердите пароль*" placeholder="Подтвердите пароль" type="password" />
      </div>

      <AppButton variant="primary" class="settings-tab__action">
        Сохранить изменения
      </AppButton>
    </div>

    <!-- Подписки -->
    <div class="settings-tab__card">
      <h2 class="settings-tab__heading">Подписки</h2>

      <div class="settings-tab__checkboxes">
        <AppCheckbox v-model="subOffers" label="Получать предложения и акции" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings-tab {
  display: flex;
  flex-direction: column;
  gap: $spacing-24;

  &__card {
    display: flex;
    flex-direction: column;
    gap: $spacing-20;
    padding: $spacing-24;
    background-color: $color-white;
    border-radius: $radius-xl;
    box-shadow: $shadow-sm;
  }

  &__heading {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $color-text;
  }

  // ── Grid rows ──
  &__row {
    display: grid;
    gap: $spacing-12;

    &--3 {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @include media-down($breakpoint-md) {
      &--3 {
        grid-template-columns: 1fr;
      }
    }
  }

  // ── Checkboxes ──
  &__checkboxes {
    display: flex;
    flex-direction: column;
    gap: $spacing-16;
  }

  // ── Action button ──
  &__action {
    align-self: flex-start;
  }

  @include media-down($breakpoint-sm) {
    &__card {
      padding: $spacing-16;
    }
  }
}
</style>
