<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <h1>Избранное</h1>
    <div class="mt-40 grid grid-cols-1 gap-y-28 gap-x-30 md:grid-cols-3 md:gap-y-60 lg:grid-cols-4">
      <ProductItem v-for="iter in productList" :key="iter.id" :model="iter" />
    </div>
    <BasePagination :pagination="pagination" class="mt-30 md:mt-60" @update:page="onUpdatePagination"></BasePagination>
  </main>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import AppStore from "@/modules/Root/store/AppStore";
import { ProfileService } from "@/modules/Profile/ProfileService";
import ProductModel from "@/modules/Catalog/models/ProductModel";
import { Pagination } from "@/_core/models/Pagination";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";

@Component
export default class FavoritesPage extends Vue {
  productList: ProductModel[] = [];
  pagination: Pagination = new Pagination();

  async fetch() {
    this.updateBreadCrumbs();
    await this.updateData();
  }

  updateBreadCrumbs() {
    const breadCrumbList = [
      { linkName: "Главная", name: "main" },
      { linkName: "Профиль", name: "personal" },
      { linkName: "Избранное" },
    ];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  async updateData() {
    this.productList = await this.$serviceLocator.getService(ProfileService).getFavorites();
  }

  onUpdatePagination(pageNmb: number) {
    this.pagination.currentPage = pageNmb;
    this.updateData();
  }

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }
}
</script>
