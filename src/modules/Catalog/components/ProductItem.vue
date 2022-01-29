<template>
  <nuxt-link v-show="!!model" :to="routeLink" class="relative flex flex-col items-center">
    <BaseHeartButton class="absolute top-0 right-0" :is-red="model.is_favorite" @click.prevent="toogleFavor()"></BaseHeartButton>
    <img
      v-lazysrc="imageSrc"
      height="286"
      width="226"
      alt=" "
      class="h-155 w-135 object-scale-down px-30 pt-15 transition-all hover:scale-105 lg:h-286 lg:w-226"
    />
    <div class="mt-30 text-center text-14 font-semibold uppercase md:mt-42">
      <slot> </slot>
    </div>
    <div class="mt-8 text-center md:mt-12">{{ model.name }}</div>
    <div class="mt-10 font-semibold md:mt-12">{{ price }}</div>
    <BaseButton class="mt-14 md:mt-20" @click.prevent="addToBasket()">В корзину</BaseButton>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import ProductModel from "../models/ProductModel";
import { ProfileService } from "@/modules/Profile/ProfileService";

@Component
export default class ProductItem extends Vue {
  @Prop()
  model: ProductModel;

  get price() {
    return (this.model?.price?.toLocaleString() || 0) + " ₽";
  }

  get routeLink() {
    return this.$serviceLocator.getService(CatalogService).getProductRouteLocation(this.model);
  }

  get imageSrc() {
    return this.model?.logo && this.model?.logo.length ? this.model.logo[0].url : "/images/product-no-photo.jpg";
  }

  async toogleFavor() {
    this.model.is_favorite = await this.$serviceLocator.getService(CatalogService).toogleFavorites(this.model);
  }

  async addToBasket() {
    await this.$serviceLocator.getService(ProfileService).addToCart(this.model.id, 1);
    this.$modalManager.showNotify("Добавлено. Можете оформить заказ!");
  }
}
</script>
