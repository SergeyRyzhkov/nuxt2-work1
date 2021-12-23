<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <h1>Новости</h1>
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
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";

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

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }
}
</script>

<style lang="scss">
.article-list-wrapper {
  display: grid;
  margin: 30px -15px 0;
  @include mobile-small {
    grid-template-columns: 1fr 1fr;
  }
  @include tablet{
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
