<template>
  <div v-if="!!model">
    <h1>{{ model.title }}</h1>
    <section>Слайдер</section>
    <section class="mt-40 md:mt-60">Болшие слайдеры</section>
    <section class="mt-40 md:mt-60">Банеры</section>
    <section v-if="!!model && !!products" class="mt-40 md:mt-60">
      <div class="text-14 text-text-gray mb-24">{{ productCountText }}</div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-40 gap-x-30">
        <ProductItem v-for="iter in products" :key="iter.id" :model="iter"> </ProductItem>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import CategoryModel from "../models/CategoryModel";

@Component
export default class CategoryContent extends Vue {
  @Prop()
  model: CategoryModel;

  get productCountText() {
    return `Найдено ${this.products.length || 0} товаров`;
  }

  get products() {
    return this.$serviceLocator.getService(CatalogService).getAllProducts(this.model);
  }
}
</script>
