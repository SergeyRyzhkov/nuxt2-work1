<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <h1>Новости</h1>

    <section class="news-list-wrapper mt-40">
      <NewsItem v-for="iter in newsList" :key="iter.id" :article-model="iter"> </NewsItem>
    </section>

    <div v-if="$fetchState.pending" class="news-list-wrapper mt-0">
      <SkeletonNewsItem v-for="index in 6" :key="index"> </SkeletonNewsItem>
    </div>

    <BasePagination :pagination="pagination" class="mt-40 lg:mt-60" @update:page="onUpdatePage"></BasePagination>
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
    this.updateBreadCrumbs();
    await this.updateData();
  }

  async updateData() {
    const result = await this.$serviceLocator
      .getService(EmptyService)
      .getArrayOrEmptyWithPagination(NewsModel, "users/news", {}, this.pagination);
    this.pagination = result.pagination;
    this.newsList = result.data;
  }

  onUpdatePage(pageNmb: number) {
    this.pagination.currentPage = pageNmb;
    this.updateData();
  }

  updateBreadCrumbs() {
    const breadCrumbList = [{ linkName: "Главная", name: "main" }, { linkName: "Новости" }];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }
}
</script>
<style lang="scss">
.news-list-wrapper {
  @apply gap-y-30 gap-x-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
}
</style>
