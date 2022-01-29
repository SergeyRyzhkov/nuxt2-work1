<template>
  <div class="flex flex-col lg:flex-row">
    <div class="flex max-h-380 w-full bg-[#F5F5F5] lg:max-h-600 lg:w-1/2">
      <img
        v-lazysrc="leftIamgeSrc"
        height="570"
        width="300"
        alt=" "
        class="m-auto h-247 w-150 object-scale-down px-30 pt-15 lg:h-570 lg:w-300"
      />
    </div>
    <div class="flex w-full lg:w-1/2" :style="bgColor">
      <div class="m-auto flex h-full flex-col items-center py-30 px-16 lg:py-100 lg:px-70">
        <div :style="color" class="mt-27 font-compact text-89">
          {{ title }}
        </div>
        <div :style="color" class="mt-18 text-center text-14">
          {{ description }}
        </div>
        <base-button v-show="!!routeLink" class="mt-40 w-max bg-white" @click="addToBasket()">{{ buttonText }}</base-button>
        <nuxt-link v-if="!!routeLink" class="mt-20 text-14 underline focus:no-underline" :to="routeLink">Узнать больше</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import MainPageModel from "../models/MainPageModel";
import { ProfileService } from "@/modules/Profile/ProfileService";
import { CatalogService } from "@/modules/Catalog/CatalogService";

@Component
export default class MainPageProduct extends Vue {
  @Prop()
  model: MainPageModel;

  get title() {
    return this.model?.content?.product.title;
  }

  get description() {
    return this.model?.content?.product.description;
  }

  get buttonText() {
    const price = this.model?.content?.product?.product.price || 0;
    return `В корзину - ${price.toLocaleString("ru-Ru")} ₽`;
  }

  get routeLink() {
    if (!!this.model?.content?.product?.product) {
      return this.$serviceLocator.getService(CatalogService).getProductRouteLocation(this.model?.content?.product?.product);
    }
    return null;
  }

  async addToBasket() {
    await this.$serviceLocator.getService(ProfileService).addToCart(this.model?.content?.product?.product.id, 1);
    this.$modalManager.showNotify("Добавлено. Можете оформить заказ!");
  }

  get color() {
    return this.model?.content?.product?.color ? { color: this.model?.content?.product?.color } : { color: "#131313" };
  }

  get bgColor() {
    return this.model?.content?.product?.background_color
      ? { "background-color": this.model?.content?.product?.background_color }
      : { "background-color": "#131313" };
  }

  get leftIamgeSrc() {
    return this.model?.banner?.url;
  }
}
</script>
