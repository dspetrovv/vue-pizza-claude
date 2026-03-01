<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

interface NavItem {
    label: string;
    value: string;
}

interface AppHeaderProps {
    navItems?: NavItem[];
    moreItems?: NavItem[];
    activeNav?: string;
    cartTotal?: number;
    cartCount?: number;
    currency?: string;
}

withDefaults(defineProps<AppHeaderProps>(), {
    navItems: () => [],
    moreItems: () => [],
    activeNav: '',
    cartTotal: 0,
    cartCount: 0,
    currency: '₽',
});

defineEmits<{
    'cart-click': [];
    'account-click': [];
    'brand-click': [];
    'nav-click': [value: string];
    'more-click': [value: string];
}>();

const isMoreOpen = ref(false);
const moreRef = ref<HTMLDivElement | null>(null);

function toggleMore() {
    isMoreOpen.value = !isMoreOpen.value;
}

function closeMore() {
    isMoreOpen.value = false;
}

const isMobileMenuOpen = ref(false);

function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
    isMobileMenuOpen.value = false;
}

watch(isMobileMenuOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : '';
});

function onClickOutside(event: MouseEvent) {
    if (moreRef.value && !moreRef.value.contains(event.target as Node)) {
        closeMore();
    }
}

function onResize() {
    if (window.innerWidth >= 1024 && isMobileMenuOpen.value) {
        closeMobileMenu();
    }
}

onMounted(() => {
    document.addEventListener('mousedown', onClickOutside);
    window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', onClickOutside);
    window.removeEventListener('resize', onResize);
    document.body.style.overflow = '';
});
</script>

<template>
    <header class="app-header">
        <div class="app-header__container">
            <a class="app-header__brand" href="/" aria-label="Пиццерия — на главную" @click.prevent="$emit('brand-click')">
                <div class="app-header__logo" aria-hidden="true">
                    <img v-if="false" src="" alt="" class="app-header__logo-image" />
                    <span v-else class="app-header__logo-emoji">🍕</span>
                </div>
                <span class="app-header__title">Пиццерия</span>
            </a>

            <nav v-if="navItems.length || moreItems.length" class="app-header__nav" aria-label="Основная навигация">
                <button
                    v-for="item in navItems"
                    :key="item.value"
                    type="button"
                    class="app-header__nav-item"
                    :class="{ 'app-header__nav-item--active': activeNav === item.value }"
                    :aria-current="activeNav === item.value ? 'true' : undefined"
                    @click="$emit('nav-click', item.value)"
                >
                    {{ item.label }}
                </button>

                <div v-if="moreItems.length" ref="moreRef" class="app-header__more">
                    <button
                        type="button"
                        class="app-header__nav-item app-header__nav-item--more"
                        :class="{ 'app-header__nav-item--active': isMoreOpen }"
                        :aria-expanded="isMoreOpen"
                        aria-haspopup="true"
                        @click="toggleMore"
                    >
                        Другое
                        <svg
                            class="app-header__chevron"
                            :class="{ 'app-header__chevron--open': isMoreOpen }"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3 4.5L6 7.5L9 4.5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>

                    <Transition name="dropdown">
                        <div v-if="isMoreOpen" class="app-header__dropdown">
                            <button
                                v-for="item in moreItems"
                                :key="item.value"
                                class="app-header__dropdown-item"
                                @click="
                                    $emit('more-click', item.value);
                                    closeMore();
                                "
                            >
                                {{ item.label }}
                            </button>
                        </div>
                    </Transition>
                </div>
            </nav>

            <div class="app-header__actions">
                <button
                    type="button"
                    class="app-header__burger"
                    :class="{ 'app-header__burger--open': isMobileMenuOpen }"
                    :aria-expanded="isMobileMenuOpen"
                    aria-controls="mobile-nav"
                    :aria-label="isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
                    @click="toggleMobileMenu"
                >
                    <span class="app-header__burger-line" aria-hidden="true" />
                    <span class="app-header__burger-line" aria-hidden="true" />
                    <span class="app-header__burger-line" aria-hidden="true" />
                </button>

                <button type="button" class="app-header__account" aria-label="Аккаунт" @click="$emit('account-click')">
                    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <circle
                            cx="12"
                            cy="7"
                            r="4"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>

                <button class="app-header__cart" :aria-label="`Корзина: ${cartTotal} ${currency}, товаров: ${cartCount}`" @click="$emit('cart-click')">
                    <svg
                        class="app-header__cart-icon"
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M3 6H21"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span class="app-header__cart-total">{{ cartTotal }} {{ currency }}</span>
                    <template v-if="cartCount > 0">
                        <span class="app-header__cart-divider" />
                        <span class="app-header__cart-count">{{ cartCount }}</span>
                    </template>
                </button>
            </div>
        </div>

        <Transition name="mobile-menu">
            <div
                v-if="isMobileMenuOpen"
                class="app-header__mobile-backdrop"
                @mousedown.self="closeMobileMenu"
            >
                <nav
                    id="mobile-nav"
                    class="app-header__mobile-menu"
                    aria-label="Мобильная навигация"
                    @keydown.escape="closeMobileMenu"
                >
                    <button
                        v-for="item in navItems"
                        :key="item.value"
                        type="button"
                        class="app-header__mobile-item"
                        :class="{ 'app-header__mobile-item--active': activeNav === item.value }"
                        :aria-current="activeNav === item.value ? 'true' : undefined"
                        @click="$emit('nav-click', item.value); closeMobileMenu()"
                    >
                        {{ item.label }}
                    </button>
                </nav>
            </div>
        </Transition>
    </header>
</template>

<style lang="scss" scoped>
.app-header {
    position: sticky;
    top: 0;
    z-index: $z-sticky;
    background-color: $color-white;
    box-shadow: $shadow-md;

    &__container {
        @include container;
        @include flex-between;
        height: 64px;
        gap: $spacing-16;
    }

    &__brand {
        display: flex;
        align-items: center;
        gap: $spacing-12;
        flex-shrink: 0;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
    }

    &__logo {
        @include flex-center;
        width: 36px;
        height: 36px;
        flex-shrink: 0;
    }

    &__logo-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    &__logo-emoji {
        font-size: 28px;
        line-height: 1;
    }

    &__title {
        font-size: $font-size-base;
        font-weight: $font-weight-bold;
        color: $color-text;
        white-space: nowrap;
    }

    // ── Nav ──
    &__nav {
        display: flex;
        align-items: center;
        gap: $spacing-4;
        flex-wrap: nowrap;

        @include media-down($breakpoint-lg) {
            display: none;
        }
    }

    &__nav-item {
        padding: $spacing-8 $spacing-12;
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: $color-text;
        white-space: nowrap;
        transition: color $transition-fast;
        cursor: pointer;

        &:hover {
            color: $color-primary;
        }

        &--more {
            display: flex;
            align-items: center;
            gap: $spacing-4;
        }

        &--active {
            color: $color-primary;
        }
    }

    // ── More dropdown ──
    &__more {
        position: relative;
    }

    &__chevron {
        flex-shrink: 0;
        transition: transform $transition-fast;

        &--open {
            transform: rotate(180deg);
        }
    }

    &__dropdown {
        position: absolute;
        top: calc(100% + $spacing-8);
        right: 0;
        min-width: 240px;
        background-color: $color-white;
        border-radius: $radius-lg;
        box-shadow: $shadow-lg;
        padding: $spacing-4;
        z-index: $z-dropdown;
    }

    &__dropdown-item {
        display: block;
        width: 100%;
        padding: $spacing-12 $spacing-16;
        font-size: $font-size-sm;
        color: $color-text;
        text-align: left;
        border-radius: $radius-md;
        cursor: pointer;
        transition: background-color $transition-fast;

        &:hover {
            background-color: $color-bg;
        }
    }

    // ── Hamburger button ──
    &__burger {
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        width: 40px;
        height: 40px;
        border-radius: $radius-md;
        cursor: pointer;
        transition: background-color $transition-fast;

        @include media-down($breakpoint-lg) {
            display: flex;
        }

        &:hover {
            background-color: $color-bg-secondary;
        }

        @include focus-ring;
    }

    &__burger-line {
        display: block;
        width: 20px;
        height: 2px;
        background-color: $color-text;
        border-radius: $radius-full;
        transition: transform $transition-base, opacity $transition-base;
    }

    &__burger--open &__burger-line {
        &:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }

        &:nth-child(2) {
            opacity: 0;
        }

        &:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }
    }

    // ── Mobile menu ──
    &__mobile-backdrop {
        display: none;

        @include media-down($breakpoint-lg) {
            display: block;
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba($color-black, 0.3);
            z-index: $z-dropdown;
        }
    }

    &__mobile-menu {
        display: flex;
        flex-direction: column;
        background-color: $color-white;
        box-shadow: $shadow-lg;
        padding: $spacing-8 0;
        max-height: calc(100dvh - 64px);
        overflow-y: auto;
    }

    &__mobile-item {
        display: block;
        width: 100%;
        padding: $spacing-16 $spacing-24;
        font-size: $font-size-md;
        font-weight: $font-weight-medium;
        color: $color-text;
        text-align: left;
        cursor: pointer;
        transition: background-color $transition-fast, color $transition-fast;

        &:hover {
            background-color: $color-bg;
        }

        &--active {
            color: $color-primary;
            background-color: rgba($color-primary, 0.08);
        }

        @include focus-ring;
    }

    // ── Actions (account + cart) ──
    &__actions {
        display: flex;
        align-items: center;
        gap: $spacing-8;
        flex-shrink: 0;
    }

    &__account {
        @include flex-center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: $color-text;
        cursor: pointer;
        transition:
            background-color $transition-fast,
            color $transition-fast;

        &:hover {
            background-color: $color-bg-secondary;
            color: $color-primary;
        }
    }

    // ── Cart ──
    &__cart {
        display: flex;
        align-items: center;
        gap: $spacing-8;
        height: 40px;
        padding: 0 $spacing-20;
        background-color: $color-primary;
        color: $color-white;
        border-radius: $radius-full;
        font-weight: $font-weight-semibold;
        font-size: $font-size-sm;
        cursor: pointer;
        flex-shrink: 0;
        transition: background-color $transition-fast;

        &:hover {
            background-color: $color-primary-hover;
        }
    }

    &__cart-icon {
        flex-shrink: 0;
    }

    &__cart-total {
        white-space: nowrap;
    }

    &__cart-divider {
        width: 1px;
        height: 20px;
        background-color: rgba($color-white, 0.3);
    }

    &__cart-count {
        white-space: nowrap;
    }
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition:
        opacity $transition-fast,
        transform $transition-fast;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

// ── Mobile menu transition ──
.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: opacity $transition-base;

    .app-header__mobile-menu {
        transition: transform $transition-base;
    }
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
    opacity: 0;

    .app-header__mobile-menu {
        transform: translateY(-16px);
    }
}
</style>
