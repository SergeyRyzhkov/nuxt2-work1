<template>
  <main class="page-wrapper container">
    <h1 class="mt-30 md:mt-60">Новости</h1>
    <section class="article-list-wrapper">
      <NewsItem v-for="iter in newsList" :key="iter.id" :article-model="iter"> </NewsItem>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import NewsModel from "../models/NewsModel";
import { PagesContentService } from "../PagesContentService";

@Component
export default class NewsListPage extends Vue {
  newsList: NewsModel[] = [];

  async fetch() {
    const result = await this.$serviceLocator
      .getService(PagesContentService)
      .getArrayOrEmptyWithPagination(NewsModel, "users/news");
    this.newsList = result.data;
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
