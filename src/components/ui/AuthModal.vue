<script setup lang="ts">
import { ref, watch } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { usePhoneMask } from '@/composables/usePhoneMask'

interface AuthModalProps {
  modelValue: boolean
}

const props = defineProps<AuthModalProps>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  login: [phone: string]
}>()

// ── Steps ──
const step = ref<'phone' | 'code'>('phone')

// ── Phone ──
const { formatted: phoneFormatted, onInput: phoneOnInput, digits: phoneDigits } = usePhoneMask()

// ── SMS code ──
const smsCode = ref('')

function close() {
  emit('update:modelValue', false)
}

function requestCode() {
  if (!phoneDigits.value.length) return
  step.value = 'code'
}

function login() {
  if (!smsCode.value.length) return
  emit('login', phoneDigits.value)
  close()
}

// Reset state when modal opens
watch(() => props.modelValue, (open) => {
  if (open) {
    step.value = 'phone'
    smsCode.value = ''
  }
})

function onBackdropMousedown(event: MouseEvent) {
  if ((event.target as HTMLElement).classList.contains('auth-modal__overlay')) {
    close()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="auth-fade">
      <div v-if="modelValue" class="auth-modal__overlay" @mousedown="onBackdropMousedown">
        <div class="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" @keydown.escape="close">
          <!-- Close -->
          <button class="auth-modal__close" type="button" aria-label="Закрыть" @click="close">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <h2 id="auth-modal-title" class="auth-modal__title">Вход в аккаунт</h2>

          <!-- Step 1: Phone number -->
          <template v-if="step === 'phone'">
            <div class="auth-modal__field">
              <AppInput
                :model-value="phoneFormatted"
                label="Номер телефона*"
                placeholder="+7 (___) ___-__-__"
                type="tel"
                digits-only
                :max-length="18"
                @update:model-value="phoneOnInput"
              />
            </div>

            <AppButton variant="primary" class="auth-modal__btn" @click="requestCode">
              Получить код
            </AppButton>
          </template>

          <!-- Step 2: SMS code -->
          <template v-else>
            <div class="auth-modal__hint">
              <p class="auth-modal__hint-text">Мы отправили код на номер:</p>
              <p class="auth-modal__hint-phone">{{ phoneFormatted }}</p>
            </div>

            <div class="auth-modal__field">
              <AppInput v-model="smsCode" label="Код из смс*" placeholder="Код" />
            </div>

            <AppButton variant="primary" class="auth-modal__btn" @click="login">
              Войти
            </AppButton>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.auth-modal {
  position: relative;
  width: 100%;
  max-width: 400px;
  padding: $spacing-32;
  background-color: $color-white;
  border-radius: $radius-xl;
  box-shadow: $shadow-lg;
  display: flex;
  flex-direction: column;
  gap: $spacing-20;

  &__overlay {
    position: fixed;
    inset: 0;
    z-index: $z-modal;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-16;
    background-color: rgba($color-black, 0.4);
    backdrop-filter: blur(4px);
  }

  &__close {
    position: absolute;
    top: $spacing-16;
    right: $spacing-16;
    @include flex-center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: $color-text-secondary;
    cursor: pointer;
    transition: background-color $transition-fast, color $transition-fast;

    &:hover {
      background-color: $color-bg;
      color: $color-text;
    }
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text;
    padding-right: $spacing-32;
  }

  &__field {
    display: flex;
    flex-direction: column;
  }

  &__hint {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__hint-text {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__hint-phone {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text;
  }

  &__btn {
    width: 100%;
  }

  @include media-down($breakpoint-sm) {
    padding: $spacing-24;
  }
}

// ── Transition ──
.auth-fade-enter-active,
.auth-fade-leave-active {
  transition: opacity $transition-base;

  .auth-modal {
    transition: transform $transition-base;
  }
}

.auth-fade-enter-from,
.auth-fade-leave-to {
  opacity: 0;

  .auth-modal {
    transform: scale(0.95) translateY(8px);
  }
}
</style>
