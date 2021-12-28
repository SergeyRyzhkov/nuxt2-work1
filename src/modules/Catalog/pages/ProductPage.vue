<template>
  <main v-show="!!slug && !$fetchState.pending" class="page-wrapper container">
    <BreadCrumbs />
    <ProductCard />
    <!--    аккордион-->

    <section class="mt-40 md:mt-60">
      <h2 class="text-42 font-compact uppercase">Рекомендуем</h2>
      <div class="mt-16 md:mt-32 flex flex-nowrap overflow-x-auto">
        <ProductItem v-for="(index, iter) in popular" :key="index" :model="iter" class="first:ml-0 ml-16 md:ml-32" />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import ProductModel from "../models/ProductModel";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";
import { ProfileService } from "@/modules/Profile/ProfileService";

@Component
export default class ProductPage extends Vue {
  @Prop()
  slug: string;

  model: ProductModel = new ProductModel();

  async fetch() {
    this.model = await this.$serviceLocator.getService(CatalogService).getProduct(this.slug);
    this.updateBreadCrumbs();
  }

  get popular() {
    return this.$serviceLocator.getService(ProfileService).getFavorites();
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
