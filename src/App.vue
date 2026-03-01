<script setup lang="ts">
import { ref, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import AuthModal from '@/components/ui/AuthModal.vue';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { useActiveSection } from '@/composables/useActiveSection';
import { navItems, footerLinks } from '@/data/navigation';

const router = useRouter();
const route = useRoute();
const cart = useCartStore();
const auth = useAuthStore();

const sectionIds = navItems.map(item => item.value);

const { activeId, scrollTo: scrollToSection } = useActiveSection(sectionIds);

provide('scrollToSection', scrollToSection);

const isAuthOpen = ref(false);

function handleNavClick(value: string) {
    if (route.name !== 'home') {
        router.push('/').then(() => {
            setTimeout(() => scrollToSection(value), 100);
        });
    } else {
        scrollToSection(value);
    }
}

function handleBrandClick() {
    router.push('/');
}

function handleCartClick() {
    router.push('/order');
}

function handleAccountClick() {
    if (auth.isAuthenticated) {
        router.push('/account');
    } else {
        isAuthOpen.value = true;
    }
}

function handleLogin(phone: string) {
    auth.login(phone);
    router.push('/account');
}
</script>

<template>
    <AppHeader
        :nav-items="navItems"
        :active-nav="activeId"
        :cart-total="cart.total"
        :cart-count="cart.count"
        @brand-click="handleBrandClick"
        @nav-click="handleNavClick"
        @cart-click="handleCartClick"
        @account-click="handleAccountClick"
    />

    <RouterView />

    <AppFooter :links="footerLinks" />

    <AuthModal v-model="isAuthOpen" @login="handleLogin" />
</template>
