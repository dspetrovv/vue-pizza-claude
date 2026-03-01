<script setup lang="ts">
interface FooterLink {
  label: string
  href: string
}

interface AppFooterProps {
  phone?: string
  email?: string
  address?: string
  description?: string
  links?: FooterLink[]
}

withDefaults(defineProps<AppFooterProps>(), {
  phone: '+7 (999) 999-99-99',
  email: 'info@vuepizza.ru',
  address: 'г. Москва, ул. Пиццы, д. 1',
  description: 'Мы готовим самую вкусную пиццу в городе с 2020 года. Только свежие ингредиенты и быстрая доставка.',
  links: () => [],
})

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="app-footer__container">
      <div class="app-footer__grid">
        <div class="app-footer__col">
          <h4 class="app-footer__heading">Контакты</h4>
          <ul class="app-footer__list">
            <li class="app-footer__item">
              <a :href="`tel:${phone.replace(/[^+\d]/g, '')}`" class="app-footer__link">
                {{ phone }}
              </a>
            </li>
            <li class="app-footer__item">
              <a :href="`mailto:${email}`" class="app-footer__link">
                {{ email }}
              </a>
            </li>
            <li class="app-footer__item">
              {{ address }}
            </li>
          </ul>
        </div>

        <div class="app-footer__col">
          <h4 class="app-footer__heading">О нас</h4>
          <p class="app-footer__description">{{ description }}</p>
          <ul v-if="links.length" class="app-footer__list app-footer__list--links">
            <li v-for="link in links" :key="link.href" class="app-footer__item">
              <a :href="link.href" class="app-footer__link">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="app-footer__bottom">
        <span class="app-footer__copy">&copy; {{ currentYear }} Vue Pizza. Все права защищены.</span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  background-color: $color-footer-bg;
  color: $color-footer-text;

  &__container {
    @include container;
    padding-top: $spacing-40;
    padding-bottom: $spacing-24;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-40;

    @include media-down($breakpoint-sm) {
      grid-template-columns: 1fr;
      gap: $spacing-32;
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: $spacing-16;
  }

  &__heading {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $color-white;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-8;

    &--links {
      flex-direction: row;
      flex-wrap: wrap;
      gap: $spacing-16;
      margin-top: $spacing-8;
    }
  }

  &__item {
    font-size: $font-size-sm;
    line-height: $line-height-base;
  }

  &__link {
    transition: color $transition-fast;

    &:hover {
      color: $color-white;
    }
  }

  &__description {
    font-size: $font-size-sm;
    line-height: $line-height-loose;
  }

  &__bottom {
    margin-top: $spacing-40;
    padding-top: $spacing-24;
    border-top: 1px solid rgba($color-white, 0.1);
  }

  &__copy {
    font-size: $font-size-xs;
    color: rgba($color-white, 0.4);
  }
}
</style>
