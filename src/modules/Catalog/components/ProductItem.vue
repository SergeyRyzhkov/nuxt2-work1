<template>
  <LazyHydrate when-visible>
    <nuxt-link v-show="!!model" :to="routeLink" class="flex flex-col items-center relative">
      <BaseHeartButton class="absolute top-10 right-10" :is-red="true" @click.prevent="add2Favor()"></BaseHeartButton>
      <img
        v-lozad="imageSrc"
        height="280"
        width="240"
        alt=" "
        class="w-240 h-280 object-cover object-top hover:scale-105 transition-all"
      />
      <div class="text-14 text-gray-color uppercase font-semibold">{{ model.title }}</div>
      <div class="text-center mt-12">{{ model.name }}</div>
      <div class="text-18 font-semibold mt-10 md:mt-12">{{ price }}</div>
      <BaseButton class="mt-14 md:mt-20" @click.prevent="addToBasket()">В корзину</BaseButton>
    </nuxt-link>
  </LazyHydrate>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import LazyHydrate from "vue-lazy-hydration";
import { CatalogService } from "../CatalogService";
import ProductModel from "../models/ProductModel";

@Component({
  components: {
    LazyHydrate,
  },
})
export default class ProductItem extends Vue {
  @Prop()
  model: ProductModel;

  get price() {
    return "10 000 ₽";
  }

  get routeLink() {
    return this.$serviceLocator.getService(CatalogService).getProductRouteLocation(this.model);
  }

  get imageSrc() {
    return this.model?.logo && this.model?.logo.length ? this.model.logo[0].url : "/images/product-no-photo.jpg";
  }

  add2Favor() {
    this.$modalManager.showNotify("Добавлено");
  }

  addToBasket() {
    this.$modalManager.showNotify("Добавлено. Можете оформить заказ!");
  }
}
</script>
