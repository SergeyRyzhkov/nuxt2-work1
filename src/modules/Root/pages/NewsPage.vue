<template>
  <main class="page-wrapper container">
    <h1 class="mt-30 md:mt-60">{{ newsModel.title }}</h1>
    <section class="mt-30 md:mt-60" v-html="newsModel.text"></section>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import NewsModel from "../models/NewsModel";
import { PagesContentService } from "../PagesContentService";

@Component
export default class NewsPage extends Vue {
  @Prop()
  id: number;

  newsModel: NewsModel = new NewsModel();

  async fetch() {
    this.newsModel = await this.$serviceLocator
      .getService(PagesContentService)
      .getOneOrDefault(NewsModel, `users/news/${this.id}`);
  }
}
</script>

<style lang="scss"></style>
