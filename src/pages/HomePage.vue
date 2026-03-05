<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import ProductCardSmall from '@/components/ui/ProductCardSmall.vue'
import TextExpander from '@/components/ui/TextExpander.vue'
import AppSidebar from '@/components/ui/AppSidebar.vue'
import ProductModal from '@/components/ui/ProductModal.vue'
import type { ProductConfig } from '@/types/product'
import type { CatalogData, PizzaProduct } from '@/types/catalog'
import { getCatalog } from '@/api/catalog'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

// ── Catalog data (loaded from API) ──
const catalog = ref<CatalogData | null>(null)

onMounted(async () => {
  catalog.value = await getCatalog()
})

// ── Filter sidebar ──
const isFilterOpen = ref(false)

const selectedFilters = reactive<Set<string>>(new Set())

function toggleFilter(item: string) {
  if (selectedFilters.has(item)) {
    selectedFilters.delete(item)
  } else {
    selectedFilters.add(item)
  }
}

function resetFilters() {
  selectedFilters.clear()
}

// ── Filtered pizzas (OR within group, AND between groups) ──
const filteredPizzas = computed(() => {
  const pizzas = catalog.value?.pizzas ?? []
  if (selectedFilters.size === 0) return pizzas

  const groups = catalog.value?.filterGroups ?? []

  // Group selected filters by their filter group
  const activeGroups = groups
    .map(g => g.items.filter(item => selectedFilters.has(item)))
    .filter(items => items.length > 0)

  if (activeGroups.length === 0) return pizzas

  return pizzas.filter(pizza =>
    activeGroups.every(groupItems =>
      groupItems.some(item => pizza.filters.includes(item)),
    ),
  )
})

// ── Product Modal ──
const isProductOpen = ref(false)

const pizzaDataMap = computed(() =>
  new Map((catalog.value?.pizzas ?? []).map(p => [p.name, p])),
)

const selectedPizza = ref<PizzaProduct | null>(null)

function openPizzaModal(pizza: PizzaProduct) {
  selectedPizza.value = pizza
  isProductOpen.value = true
}

function handleSalesSelect(item: { name: string; price: number; emoji?: string }) {
  const pizza = pizzaDataMap.value.get(item.name)
  if (pizza) {
    openPizzaModal(pizza)
  } else {
    handleAddToCart(item)
  }
}

function handlePizzaAdd(config: ProductConfig) {
  if (!selectedPizza.value || !catalog.value) return
  const pizza = selectedPizza.value
  const sizeLabel = catalog.value.pizzaSizeOptions.find(o => o.value === config.size)?.label ?? config.size
  const doughLabel = catalog.value.pizzaDoughOptions.find(o => o.value === config.dough)?.label ?? config.dough

  const removedSorted = [...config.removedIngredients].sort()
  const addonsSorted = [...config.selectedAddons].sort()

  const removedSuffix = removedSorted.length ? `-r:${removedSorted.join(',')}` : ''
  const addonsSuffix = addonsSorted.length ? `-a:${addonsSorted.join(',')}` : ''
  const baseId = pizza.name.toLowerCase().replace(/\s+/g, '-')
  const uniqueId = `${baseId}-${config.dough}-${config.size}${removedSuffix}${addonsSuffix}`

  const removedNames = pizza.ingredients
    .filter(i => config.removedIngredients.includes(i.id))
    .map(i => i.name)
  const addedNames = pizza.addons
    .filter(a => config.selectedAddons.includes(a.id))
    .map(a => a.name)

  cart.addItem({
    id: uniqueId,
    name: pizza.name,
    description: `${doughLabel} тесто, ${sizeLabel}`,
    price: config.totalPrice,
    quantity: 1,
    emoji: pizza.emoji,
    removedIngredients: removedNames.length ? removedNames : undefined,
    addedIngredients: addedNames.length ? addedNames : undefined,
  })
}

function handleAddToCart(product: { name: string; price: number; emoji?: string }) {
  cart.addItem({
    id: product.name.toLowerCase().replace(/\s+/g, '-'),
    name: product.name,
    description: '',
    price: product.price,
    quantity: 1,
    emoji: product.emoji,
  })
}
</script>

<template>
  <main v-if="catalog" class="home">
    <!-- Акции -->
    <section id="sales" class="home__section">
      <div class="home__section-header">
        <h2 class="home__section-title">Акции</h2>
      </div>
      <div class="home__grid home__grid--large">
        <ProductCard
          v-for="item in catalog.sales"
          :key="item.name"
          :name="item.name"
          :description="item.description"
          :price="item.price"
          :tag="item.tag"
          :emoji="item.emoji"
          @select="handleSalesSelect(item)"
        />
      </div>
    </section>

    <!-- Пицца (with filter button) -->
    <section id="pizza" class="home__section">
      <div class="home__section-header">
        <h2 class="home__section-title">Пицца</h2>
        <AppButton variant="outline" size="sm" @click="isFilterOpen = true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          Фильтры{{ selectedFilters.size ? ` (${selectedFilters.size})` : '' }}
        </AppButton>
      </div>
      <div class="home__grid home__grid--large">
        <ProductCard
          v-for="item in filteredPizzas"
          :key="item.name"
          :name="item.name"
          :description="item.description"
          :price="item.price"
          :tag="item.tag"
          :emoji="item.emoji"
          @select="openPizzaModal(item)"
        />
      </div>

      <p v-if="filteredPizzas.length === 0" class="home__empty">
        Ничего не найдено. Попробуйте изменить фильтры.
      </p>
    </section>

    <!-- Суши -->
    <section id="sushi" class="home__section">
      <div class="home__section-header">
        <h2 class="home__section-title">Суши</h2>
      </div>
      <div class="home__grid home__grid--large">
        <ProductCard
          v-for="item in catalog.sushi"
          :key="item.name"
          :name="item.name"
          :description="item.description"
          :price="item.price"
          :tag="item.tag"
          :emoji="item.emoji"
          @select="handleAddToCart(item)"
        />
      </div>
    </section>

    <!-- Напитки -->
    <section id="drinks" class="home__section">
      <div class="home__section-header">
        <h2 class="home__section-title">Напитки</h2>
      </div>
      <div class="home__grid home__grid--small">
        <ProductCardSmall
          v-for="item in catalog.drinks"
          :key="item.name"
          :name="item.name"
          :price="item.price"
          :portion="item.portion"
          :emoji="item.emoji"
          @add="handleAddToCart(item)"
        />
      </div>
    </section>

    <!-- Закуски -->
    <section id="snacks" class="home__section">
      <div class="home__section-header">
        <h2 class="home__section-title">Закуски</h2>
      </div>
      <div class="home__grid home__grid--small">
        <ProductCardSmall
          v-for="item in catalog.snacks"
          :key="item.name"
          :name="item.name"
          :price="item.price"
          :portion="item.portion"
          :emoji="item.emoji"
          @add="handleAddToCart(item)"
        />
      </div>
    </section>

    <!-- Комбо -->
    <section id="combo" class="home__section">
      <div class="home__section-header">
        <h2 class="home__section-title">Комбо</h2>
      </div>
      <div class="home__grid home__grid--large">
        <ProductCard
          v-for="item in catalog.combo"
          :key="item.name"
          :name="item.name"
          :description="item.description"
          :price="item.price"
          :tag="item.tag"
          :emoji="item.emoji"
          @select="handleAddToCart(item)"
        />
      </div>
    </section>

    <!-- Десерты -->
    <section id="desserts" class="home__section">
      <div class="home__section-header">
        <h2 class="home__section-title">Десерты</h2>
      </div>
      <div class="home__grid home__grid--small">
        <ProductCardSmall
          v-for="item in catalog.desserts"
          :key="item.name"
          :name="item.name"
          :price="item.price"
          :portion="item.portion"
          :emoji="item.emoji"
          @add="handleAddToCart(item)"
        />
      </div>
    </section>

    <!-- Соусы -->
    <section id="sauces" class="home__section">
      <div class="home__section-header">
        <h2 class="home__section-title">Соусы</h2>
      </div>
      <div class="home__grid home__grid--small">
        <ProductCardSmall
          v-for="item in catalog.sauces"
          :key="item.name"
          :name="item.name"
          :price="item.price"
          :emoji="item.emoji"
          @add="handleAddToCart(item)"
        />
      </div>
    </section>

    <!-- Text Expander (SEO block before footer) -->
    <section class="home__section">
      <TextExpander title="Пиццерия — доставка и не только">
        <p>
          «Пиццерия» — это не просто доставка еды, а целая философия вкуса и
          заботы. Мы начинали как маленькая пиццерия на окраине города, а сегодня
          обслуживаем тысячи клиентов ежедневно. Наша команда с любовью готовит
          каждое блюдо, используя только свежие и качественные ингредиенты.
        </p>
        <p>
          В нашем меню вы найдёте классические и авторские пиццы, роллы, суши,
          закуски, десерты и напитки. Мы постоянно обновляем ассортимент и
          добавляем сезонные новинки, чтобы каждый заказ приносил радость и
          удивление. Мы ценим ваше время, поэтому доставка занимает не более 60
          минут — а чаще всего мы привозим заказ за 30–40 минут.
        </p>
        <p>
          Помимо доставки, у нас работают уютные рестораны, где можно приятно
          провести время с семьёй или друзьями. Для постоянных гостей действует
          программа лояльности с бонусами и эксклюзивными предложениями.
          Присоединяйтесь к нашему сообществу и наслаждайтесь вкусом каждый день!
        </p>
      </TextExpander>
    </section>
  </main>

  <!-- Filter sidebar (pizza only) -->
  <AppSidebar v-model="isFilterOpen" title="Фильтры">
    <div class="filters">
      <div v-for="group in catalog?.filterGroups" :key="group.title" class="filters__group">
        <h4 class="filters__group-title">{{ group.title }}</h4>
        <div class="filters__items">
          <AppButton
            v-for="item in group.items"
            :key="item"
            :variant="selectedFilters.has(item) ? 'primary' : 'outline'"
            size="sm"
            @click="toggleFilter(item)"
          >
            {{ item }}
          </AppButton>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="filters__actions">
        <AppButton variant="outline" @click="resetFilters">Сбросить</AppButton>
        <AppButton @click="isFilterOpen = false">Применить</AppButton>
      </div>
    </template>
  </AppSidebar>

  <!-- Product Modal (pizza only) -->
  <ProductModal
    v-if="selectedPizza && catalog"
    v-model="isProductOpen"
    :name="selectedPizza.name"
    :base-price="selectedPizza.price"
    :weight="selectedPizza.weight"
    :tag="selectedPizza.tag"
    :emoji="selectedPizza.emoji"
    :ingredients="selectedPizza.ingredients"
    :dough-options="catalog.pizzaDoughOptions"
    :size-options="catalog.pizzaSizeOptions"
    :addons="selectedPizza.addons"
    @add="handlePizzaAdd"
  />
</template>

<style lang="scss" scoped>
.home {
  @include container;
  padding-top: $spacing-24;
  padding-bottom: $spacing-40;
  display: flex;
  flex-direction: column;
  gap: $spacing-40;

  &__section {
    display: flex;
    flex-direction: column;
    gap: $spacing-20;
  }

  &__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-16;
  }

  &__section-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text;
  }

  &__empty {
    text-align: center;
    color: $color-text-secondary;
    font-size: $font-size-base;
    padding: $spacing-24 0;
  }

  &__grid {
    display: grid;
    gap: $spacing-16;

    &--large {
      grid-template-columns: repeat(4, 1fr);

      @include media-down($breakpoint-xl) {
        grid-template-columns: repeat(3, 1fr);
      }

      @include media-down($breakpoint-md) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include media-down($breakpoint-sm) {
        grid-template-columns: 1fr;
      }
    }

    &--small {
      grid-template-columns: repeat(6, 1fr);

      @include media-down($breakpoint-xl) {
        grid-template-columns: repeat(4, 1fr);
      }

      @include media-down($breakpoint-md) {
        grid-template-columns: repeat(3, 1fr);
      }

      @include media-down($breakpoint-sm) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}

.filters {
  display: flex;
  flex-direction: column;
  gap: $spacing-24;

  &__group {
    display: flex;
    flex-direction: column;
    gap: $spacing-12;
  }

  &__group-title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-8;
  }

  &__actions {
    display: flex;
    gap: $spacing-12;

    > * {
      flex: 1;
    }
  }
}
</style>
