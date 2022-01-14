<template>
  <LazyHydrate when-visible>
    <nuxt-link v-show="!!model" :to="routeLink" class="relative flex flex-col items-center">
      <BaseHeartButton class="absolute top-0 right-0" :is-red="true" @click.prevent="add2Favor()"></BaseHeartButton>
      <img
        v-lozad="imageSrc"
        height="286"
        width="226"
        alt=" "
        class="w-226 h-286 object-scale-down hover:scale-105 transition-all px-30 pt-15"
      />
      <div class="text-center mt-30 md:mt-42 uppercase text-14 font-semibold">
        <slot> </slot>
      </div>
      <div class="text-center mt-8 md:mt-12">{{ model.name }}</div>
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
