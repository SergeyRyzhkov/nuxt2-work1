<template>
  <main v-show="!!slug && !$fetchState.pending" class="page-wrapper container">
    <BreadCrumbs />
    <ProductCard />
<!--    аккордион-->
    <h2 class="text-42 font-bold mt-86">Рекомендуем</h2>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import ProductModel from "../models/ProductModel";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";

@Component
export default class ProductPage extends Vue {
  @Prop()
  slug: string;

  model: ProductModel = new ProductModel();

  async fetch() {
    this.model = await this.$serviceLocator.getService(CatalogService).getProduct(this.slug);
    this.updateBreadCrumbs();
  }

  head() {
    if (!!this.model?.meta_slug) {
      this.model.meta_image = this.model.logo?.url || this.model.banner?.url || undefined;
    }
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.model, this.$route.fullPath);
  }

  updateBreadCrumbs() {
    const breadCrumbList = [
      { linkName: "Главная", name: "main" },
      { linkName: "Каталог", name: "catalog" },
      { linkName: `${this.model.title || this.model.meta_slug}` },
    ];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }
}
</script>

<style lang="scss"></style>
