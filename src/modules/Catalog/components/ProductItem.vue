<template>
  <nuxt-link v-show="!!model" :to="routeLink" class="flex flex-col items-center">
    <BaseHeartButton class="ml-auto" :is-red="true" @click.prevent="add2Favor()"></BaseHeartButton>
    <img
      v-lozad="'/images/tmp_product.jpg'"
      height="280"
      width="240"
      alt=" "
      class="w-240 h-280 object-scale-down object-top hover:scale-105 transition-all"
    />
    <div class="text-14 text-gray-color uppercase font-semibold">Для лица</div>
    <div class="text-center mt-12">Шампунь KAYPRO Caviar Supreme для окрашенных волос</div>
    <div class="text-18 font-semibold mt-12">{{ price }}</div>
    <BaseButton class="my-32 mt-20" @click.prevent="addToBasket()">В корзину</BaseButton>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import ProductModel from "../models/ProductModel";

@Component
export default class ProductItem extends Vue {
  @Prop()
  model: ProductModel;

  get price() {
    return "10 000 ₽";
  }

  get routeLink() {
    return this.$serviceLocator.getService(CatalogService).createProductRouteLocation(this.model);
  }

  add2Favor() {
    this.$modalManager.showNotify("Добавлено");
  }

  addToBasket() {}
}
</script>
