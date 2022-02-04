<template>
  <div v-if="!!model">
    <BaseStaticBanner :image-src="bannerSrc" :is-container="true" default-image="/images/default-banner-black.jpg"
      ><h1 v-if="!bannerSrc" class="bottom-30 absolute left-60 text-white md:bottom-60" v-html="model.title"></h1
    ></BaseStaticBanner>
    <section v-if="!!model && !!productList" class="mt-40 md:mt-60">
      <div class="text-14 text-text-gray mb-28">{{ productCountText }}</div>
      <div class="grid grid-cols-2 gap-x-9 gap-y-40 md:grid-cols-2 lg:grid-cols-3">
        <ProductItem v-for="iter in productList" :key="iter.id" :model="iter"> </ProductItem>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import CategoryModel from "../models/CategoryModel";
import { CatalogService } from "../CatalogService";
import ProductModel from "../models/ProductModel";
import { decOfNum } from "@/utils/Formaters";

@Component
export default class LeafCategory extends Vue {
  @Prop()
  model: CategoryModel;

  productList: ProductModel[] = [];

  async fetch() {
    this.productList = await this.$serviceLocator.getService(CatalogService).getProductsByCategory(this.model);
  }

  get bannerSrc() {
    return this.model?.banner?.url;
  }

  get productCountText() {
    return `Найдено: ${this.productList.length} ${decOfNum(this.productList.length, ["товар", "товара", "товаров"])}`;
  }
}
</script>
