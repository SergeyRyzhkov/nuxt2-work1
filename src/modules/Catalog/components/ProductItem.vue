<template>
  <LazyHydrate when-visible>
    <nuxt-link v-show="!!model" :to="routeLink" class="relative flex flex-col items-center hover:scale-105 transition-all">
      <BaseHeartButton class="absolute top-10 right-5" :is-red="true" @click.prevent="add2Favor()"></BaseHeartButton>
      <img v-lozad="imageSrc" height="286" width="247" alt=" " class="w-247 h-286 object-scale-down" />
      <div class="text-center mt-30 md:mt-42">{{ model.name }}</div>
      <div class="font-semibold mt-10 md:mt-12">{{ price }}</div>
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
