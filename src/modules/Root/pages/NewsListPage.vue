<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <h1>Новости</h1>

    <section v-if="$fetchState.pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-30 gap-x-30 mt-40">
      <template v-for="index in 6">
        <SkeletonNewsItem :key="index"> </SkeletonNewsItem>
      </template>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-30 gap-x-30 mt-40">
      <NewsItem v-for="iter in newsList" :key="iter.id" :article-model="iter"> </NewsItem>
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
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";

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

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }
}
</script>
