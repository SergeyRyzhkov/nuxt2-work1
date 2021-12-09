<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <h1 class="mt-15 md:mt-30">Новости</h1>
    <section class="article-list-wrapper">
      <NewsItem v-for="iter in newsList" :key="iter.meta_slug" :article-model="iter"> </NewsItem>
    </section>
    <BasePagination :pagination="pagination" class="mt-30 md:mt-60" @update:page="onUpdatePagination"></BasePagination>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import NewsModel from "../models/NewsModel";
import AppStore from "../store/AppStore";
import { Pagination } from "@/_core/models/Pagination";
import { EmptyService } from "@/_core/service/EmptyService";

@Component
export default class NewsListPage extends Vue {
  newsList: NewsModel[] = [];
  pagination: Pagination = new Pagination();

  async fetch() {
    await this.updateData();
    this.updateBreadCrumbs();
  }

  async updateData() {
    const result = await this.$serviceLocator
      .getService(EmptyService)
      .getArrayOrEmptyWithPagination(NewsModel, "users/news", {}, this.pagination);
    this.newsList = result.data;
    this.pagination = result.pagination;
  }

  updateBreadCrumbs() {
    const breadCrumbList = [{ linkName: "Главная", name: "main" }, { linkName: "Новости" }];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  onUpdatePagination(pageNmb: number) {
    this.pagination.currentPage = pageNmb;
    this.updateData();
  }
}
</script>

<style lang="scss">
.article-list-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin: 30px -15px 0;
}
</style>
