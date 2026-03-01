# Pizzeria App — Project Context

## Project Overview
Приложение пиццерии (SPA). UI создаётся по скриншотам из Figma + текстовые инструкции.

## Tech Stack
- **Framework:** Vue 3.5 (Composition API, `<script setup>`)
- **Language:** TypeScript 5.9 (strict, no `any`)
- **Styles:** SCSS (BEM methodology, sass-embedded)
- **Build:** Vite 7
- **Testing:** Vitest 4 + @vue/test-utils 2 + jsdom
- **Node.js:** 22 (see `.nvmrc`)
- **Architecture:** Component-oriented, scalable SPA

## Architecture Rules
- Composition API only (`<script setup>`)
- Logic and presentation separated
- Reusable composables in `src/composables/`
- Props via interfaces, typed emits
- No excessive reactivity — use `shallowRef`, `markRaw`, `computed` consciously
- No inline styles — SCSS + BEM only
- Tree-shaking friendly imports
- Path alias: `@` -> `src/`

## Project Structure
```
src/
├── assets/          # Static assets (images, fonts, icons)
│   ├── fonts/
│   ├── icons/
│   └── images/
├── components/      # Reusable UI components
│   ├── ui/          # Base UI kit (buttons, inputs, etc.)
│   └── layout/      # Layout components (header, footer, etc.)
├── composables/     # Reusable composition functions
├── config/          # App configuration (API mode toggle)
├── api/             # API service layer (mock/real switch)
├── data/            # Static mock data (used in mock mode)
├── pages/           # Page-level components
├── router/          # Vue Router config
├── stores/          # State management (Pinia if needed)
├── styles/          # Global SCSS
│   ├── _variables.scss   # Design tokens (colors, typography, spacing, etc.)
│   ├── _mixins.scss      # Reusable SCSS mixins
│   ├── _reset.scss       # CSS reset
│   └── main.scss         # Entry point (imports reset)
├── types/           # Shared TypeScript interfaces/types
├── utils/           # Utility functions
├── __tests__/       # Unit tests (vitest + vue-test-utils)
│   ├── setup.ts     # Global test setup (jsdom stubs)
│   ├── api/         # API service tests
│   ├── components/  # UI component tests
│   ├── composables/ # Composable tests
│   ├── config/      # Config tests
│   ├── data/        # Data module tests
│   ├── stores/      # Store tests
│   └── utils/       # Utility tests
├── App.vue
└── main.ts
```

## SCSS Architecture
- `_variables.scss` and `_mixins.scss` are auto-injected into all Vue component `<style>` blocks via `vite.config.ts` → `css.preprocessorOptions.scss.additionalData`
- Files that `@use` variables directly (like `_reset.scss`) must explicitly `@use 'variables' as *`
- BEM naming: `.block__element--modifier`

## Design System (from _variables.scss)
- **Primary color:** `$color-primary: #ff6900` (orange)
- **App background:** `$color-bg: #f5f0e9` (warm beige)
- **Footer bg:** `$color-footer-bg: #1c1c1e` (dark)
- **Font:** Inter, system fallback
- **Font sizes:** 12px–40px scale
- **Spacing:** 4px–64px scale
- **Border radius:** 4px–9999px
- **Shadows:** sm/md/lg
- **Breakpoints:** 576/768/1024/1280/1440px
- **Container:** max-width 1320px

## Components Registry
| Component | Path | Status | Description |
|-----------|------|--------|-------------|
| AppButton | `src/components/ui/AppButton.vue` | Done | Primary/outline/ghost, loading, circle variants |
| ToggleGroup | `src/components/ui/ToggleGroup.vue` | Done | Tab selector with v-model (sizes, types) |
| AppTag | `src/components/ui/AppTag.vue` | Done | Filled/outline tags (Хит, Новинка) |
| AppRadio | `src/components/ui/AppRadio.vue` | Done | Radio button with label |
| AppCheckbox | `src/components/ui/AppCheckbox.vue` | Done | Checkbox with label |
| PriceBadge | `src/components/ui/PriceBadge.vue` | Done | Price display "от 499 ₽" |
| CounterInput | `src/components/ui/CounterInput.vue` | Done | Quantity -/+ counter |
| CartButton | `src/components/ui/CartButton.vue` | Done | Circle cart button with count badge |
| AppInput | `src/components/ui/AppInput.vue` | Done | Text input with label, error, prefix/suffix/action slots |
| AppTextarea | `src/components/ui/AppTextarea.vue` | Done | Multiline textarea with label, error |
| AppSelect | `src/components/ui/AppSelect.vue` | Done | Dropdown with keyboard nav, a11y, transition |
| CategoryButton | `src/components/ui/CategoryButton.vue` | Done | Vertical card-button with emoji/image + label |
| CartSummary | `src/components/ui/CartSummary.vue` | Done | Total + weight + action button card |
| OrderCard | `src/components/ui/OrderCard.vue` | Done | Expandable order card with status bar, info grid, product list, repeat button |
| AppPagination | `src/components/ui/AppPagination.vue` | Done | Page navigation with arrows, numbers, ellipsis, a11y |
| CartItem | `src/components/ui/CartItem.vue` | Done | Cart product row with counter and price, responsive |
| ProductCardSmall | `src/components/ui/ProductCardSmall.vue` | Done | Compact card (fries, sauces) with price button |
| ProductCard | `src/components/ui/ProductCard.vue` | Done | Large product card with tag, description, select button |
| AppSidebar | `src/components/ui/AppSidebar.vue` | Done | Slide-in right panel with blur backdrop, slotted |
| OrderSidebar | `src/components/ui/OrderSidebar.vue` | Done | Cart/order sidebar composing AppSidebar + CartItem + CartSummary |
| IngredientCard | `src/components/ui/IngredientCard.vue` | Done | Base/addon ingredient card with toggle, badge, price |
| ProductModal | `src/components/ui/ProductModal.vue` | Done | Pizza product modal with ingredients, toggles, addons, summary |
| AppCarousel | `src/components/ui/AppCarousel.vue` | Done | Horizontal scroll carousel with arrow nav, scroll-snap, responsive |
| AuthModal | `src/components/ui/AuthModal.vue` | Done | 2-step auth modal: phone input → SMS code, uses usePhoneMask |
| TextExpander | `src/components/ui/TextExpander.vue` | Done | Collapsible text block with gradient fade, "Показать полностью" toggle |
| AppHeader | `src/components/layout/AppHeader.vue` | Done | Sticky header with clickable brand→home, text nav with active section highlight, account icon, cart button |
| AppFooter | `src/components/layout/AppFooter.vue` | Done | Dark footer with contacts, about, links |

## Pages
| Page | Path | Route | Description |
|------|------|-------|-------------|
| HomePage | `src/pages/HomePage.vue` | `/` | Product catalog with category sections (no carousel), IntersectionObserver scroll tracking |
| OrderPage | `src/pages/OrderPage.vue` | `/order` | Cart, promo, suggestions, full checkout (about, delivery/pickup, timing, payment, change, comment) |
| DeliveryForm | `src/pages/DeliveryForm.vue` | — | Delivery fields only (address, entrance/floor/apt) — used inside KeepAlive |
| PickupForm | `src/pages/PickupForm.vue` | — | Pickup fields only (restaurant select) — used inside KeepAlive |
| AccountPage | `src/pages/AccountPage.vue` | `/account` | My account with History/Settings tabs via KeepAlive |
| OrderHistoryTab | `src/pages/OrderHistoryTab.vue` | — | Order list with infinite scroll (IntersectionObserver), fake API |
| SettingsTab | `src/pages/SettingsTab.vue` | — | Settings: personal data, password (change), subscriptions (checkboxes) |
| OrderSuccessPage | `src/pages/OrderSuccessPage.vue` | `/order-success` | Order confirmation: checkmark, order number, "Вернуться на главную" |

## Composables
| Composable | Path | Description |
|------------|------|-------------|
| usePhoneMask | `src/composables/usePhoneMask.ts` | Russian phone mask +7 (XXX) XXX-XX-XX — auto-format, digits only, max 10 |
| useActiveSection | `src/composables/useActiveSection.ts` | IntersectionObserver-based active section tracking + smooth scrollTo |
| useInfiniteScroll | `src/composables/useInfiniteScroll.ts` | IntersectionObserver-based infinite scroll via useTemplateRef(sentinelKey), loading/finished state |

## Stores
| Store | Path | Description |
|-------|------|-------------|
| useCartStore | `src/stores/cart.ts` | Cart state: items, total, count, add/remove/update/clear |
| useAuthStore | `src/stores/auth.ts` | Auth state: fake JWT token + user in localStorage, login/logout, isAuthenticated |

## Utils
| Util | Path | Description |
|------|------|-------------|
| formatPrice | `src/utils/format.ts` | Number formatting with Russian locale (space thousands separator) |
| fetchOrders | `src/utils/fakeOrderApi.ts` | Fake paginated order API with seeded random data, simulates network delay |

## Testing
- **Runner:** Vitest 4 with jsdom environment
- **Component testing:** @vue/test-utils 2 + @pinia/testing
- **Config:** `vitest.config.ts` (Vue plugin, `@` alias, jsdom, global test APIs)
- **Setup:** `src/__tests__/setup.ts` (stubs: IntersectionObserver, ResizeObserver, scrollIntoView, scrollTo)
- **Scripts:** `npm run test` (single run), `npm run test:watch` (watch mode)
- **Coverage:** 38 test files, 250 tests across utils, config, API, stores, composables, UI components, data modules
- **Build isolation:** Test files excluded from `vue-tsc` build via `tsconfig.app.json` → `"exclude": ["src/**/__tests__/**"]`

## Key Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-21 | Vue 3 + Vite 7 + TS 5.9 | Modern stack, fast builds |
| 2026-02-21 | Node 22 (via nvm) | Required by Vite 7 |
| 2026-02-21 | sass-embedded | Faster than dart-sass, native Vite 7 support |
| 2026-02-21 | No Storybook | Removed per user request |
| 2026-02-21 | SCSS auto-inject | Variables & mixins available in all components |
| 2026-02-22 | Vue Router + Pinia | Page routing and centralized cart state management |
| 2026-02-22 | KeepAlive for checkout forms | Preserve Delivery/Pickup form state when switching tabs |
| 2026-02-22 | Shared checkout sections | About, timing, payment, change, comment in OrderPage; only address/restaurant in forms |
| 2026-02-22 | Phone mask composable | usePhoneMask for +7 (XXX) XXX-XX-XX auto-formatting |
| 2026-02-23 | Account page with KeepAlive tabs | History/Settings tabs, same pattern as checkout forms |
| 2026-02-23 | IntersectionObserver for nav | Active section highlight in header via useActiveSection composable |
| 2026-02-23 | Catalog layout for HomePage | Sections with id-based scroll anchors, categories carousel, filter sidebar on pizza |
| 2026-02-27 | Infinite scroll for order history | Replaced AppPagination with IntersectionObserver-based infinite scroll + fake API |
| 2026-02-27 | Input validation: date & phone | SettingsTab birthday uses type="date", phone fields use digits-only + max-length in SettingsTab & AuthModal |
| 2026-02-27 | Auth store with fake JWT | Pinia auth store with localStorage persistence, route guard on /account, account icon navigates to /account when authenticated |
| 2026-02-27 | Order success page | OrderSuccessPage at /order-success, cart cleared on submit, redirect after checkout |
| 2026-02-27 | Header simplification | Removed "Другое" dropdown, nav items are text spans (not buttons), brand is clickable → home |
| 2026-02-27 | Removed categories carousel | HomePage no longer has top categories carousel (duplicated header nav) |
| 2026-02-28 | ProductModal only for pizza | Modal opens only for pizza products; sushi/combos/other go directly to cart |
| 2026-02-28 | Per-pizza unique ingredients | Each pizza has culinary-appropriate base ingredients (removable) and addons (addable) |
| 2026-02-28 | useInfiniteScroll refactor | Composable accepts sentinelKey string + uses useTemplateRef (Vue 3.5 pattern) |
| 2026-02-28 | Comprehensive a11y attributes | ARIA roles/labels/states across all components: dialogs, tabs, groups, alerts, live regions, semantic HTML |
| 2026-02-28 | Responsive hamburger menu | Mobile nav with burger button, slide-down menu, backdrop, auto-close on resize/nav-click, body scroll lock |
| 2026-02-28 | API service layer | config/ + api/ + data/ + types/; .env VITE_API_MODE=mock|real toggle; all hardcoded data extracted to src/data/, API services in src/api/ with mock/real switch |
| 2026-03-01 | Vitest test suite | 38 test files, 250 tests; vitest 4 + vue-test-utils 2 + jsdom; centralized setup with browser API stubs |
| 2026-03-01 | Pizza SVG favicon | Custom pizza-themed SVG favicon replacing default Vite icon |

## Current State
- [x] Project scaffolding (Vite + Vue 3 + TS)
- [x] SCSS architecture setup
- [x] Base UI kit
- [x] Router setup (vue-router)
- [x] Pages (HomePage, OrderPage, AccountPage)
- [x] State management (Pinia cart store)
- [x] Account section (order history, settings)
- [x] Catalog with section navigation (IntersectionObserver + smooth scroll)
- [x] Infinite scroll for order history (replaced pagination)
- [x] Input validation: date picker for birthday, digits-only phone in SettingsTab & AuthModal
- [x] Auth system: fake JWT store, localStorage persistence, route guard, conditional account navigation
- [x] Order success page (redirect after checkout, cart cleared)
- [x] Header: clickable brand→home, removed "Другое", text nav items
- [x] HomePage: removed categories carousel (duplicated header nav)
- [x] ProductModal: pizza-only with per-pizza unique ingredients and addons
- [x] Accessibility (a11y): ARIA attributes, semantic HTML, keyboard navigation across all components
- [x] Responsive header: hamburger menu on mobile (< 1024px) with slide-down nav panel
- [x] API layer: mock/real toggle via .env, all static data extracted to src/data/, services in src/api/
- [x] Test suite: 38 files, 250 tests (vitest + vue-test-utils), all passing
- [x] Custom pizza SVG favicon

## Git
- **Remote:** `git@github.com:dspetrovv/vue-pizza-claude.git`
- **Commit naming:** imperative mood, English, as if completing "[this commit will] ..."
  - Examples: `Create tests`, `Add cart mock data`, `Fix header layout`
- **No long commit messages** — keep them concise

## Notes
- При работе по скриншотам: сначала анализ структуры, потом архитектура, потом код
- Если размеры/цвета неочевидны — разумные допущения с пометкой
- Перед запуском: `nvm use 22` (или `nvm use` с .nvmrc)
