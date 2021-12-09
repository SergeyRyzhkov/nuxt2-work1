<template>
  <main v-if="!$fetchState.pending" class="page-wrapper container">
    <BreadCrumbs />
    <h1 class="mt-15 md:mt-30">{{ newsModel.title }}</h1>
    <section class="mt-30 md:mt-60" v-html="newsModel.text"></section>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue, getModule } from "nuxt-property-decorator";
import NewsModel from "../models/NewsModel";
import AppStore from "../store/AppStore";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import { EmptyService } from "@/_core/service/EmptyService";

@Component
export default class NewsPage extends Vue {
  @Prop()
  slug: number;

  newsModel: NewsModel = new NewsModel();

  async fetch() {
    this.newsModel = await this.$serviceLocator.getService(EmptyService).getOneOrDefault(NewsModel, `users/news/${this.slug}`);
    this.updateBreadCrumbs();
    // this.$nuxt.error({ statusCode: 503, message: "Unable to fetch" });
  }

  updateBreadCrumbs() {
    const breadCrumbList = [
      { linkName: "Главная", name: "main" },
      { linkName: "Новости", name: "news" },
      { linkName: this.newsModel?.title?.substring(0, 100) + "..." },
    ];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  head() {
    if (!!this.newsModel.meta_slug) {
      this.newsModel.meta_image = this.newsModel.logo.url;
      return this.$serviceLocator.getService(SeoMetaTagsBuilder).createHead(this.newsModel, this.$route.fullPath);
    }
  }
}
</script>

<style lang="scss"></style>
