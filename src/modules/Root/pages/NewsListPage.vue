<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <h1>Новости</h1>

    <section class="news-list-wrapper mt-40">
      <NewsItem v-for="iter in newsList" :key="iter.id" :article-model="iter"> </NewsItem>
    </section>

    <InfiniteScroll class="news-list-wrapper mt-0" @on-intersect="loadMore()">
      <template v-if="loading">
        <SkeletonNewsItem v-for="index in 6" :key="index"> </SkeletonNewsItem>
      </template>
    </InfiniteScroll>
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
  loading = true;
  newsList: NewsModel[] = [];
  pagination: Pagination = new Pagination();

  async fetch() {
    this.updateBreadCrumbs();
    await this.loadMore();
  }

  async loadMore() {
    if (Pagination.loadMoreHasNextPage(this.pagination)) {
      this.loading = true;
      Pagination.loadMore(this.pagination);
      const result = await this.$serviceLocator
        .getService(EmptyService)
        .getArrayOrEmptyWithPagination(NewsModel, "users/news", {}, this.pagination);
      this.pagination.total = result.pagination.total;
      this.newsList = [...this.newsList, ...result.data];
      this.loading = false;
    }
  }

  updateBreadCrumbs() {
    const breadCrumbList = [{ linkName: "Главная", name: "main" }, { linkName: "Новости" }];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }
}
</script>
<style lang="scss">
.news-list-wrapper {
  @apply gap-y-30 gap-x-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
}
</style>
