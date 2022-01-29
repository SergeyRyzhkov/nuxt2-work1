<template>
  <div class="page-wrapper">
    <BaseStaticBanner :image-src="bannerSrc" />
    <main class="container mt-40">
      <div class="flex flex-col-reverse md:flex-row">
        <div class="mt-32 w-full md:mt-0 md:w-1/4">
          {{ newsDate }}
        </div>
        <div class="w-full md:w-1/2">
          <h1>{{ newsModel.title }}</h1>
          <section class="mt-30 md:mt-60" v-html="newsModel.text"></section>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, getModule } from "nuxt-property-decorator";
import NewsModel from "../models/NewsModel";
import AppStore from "../store/AppStore";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import { EmptyService } from "@/_core/service/EmptyService";
import Cacheable from "@/_core/MethodCacheDecorator";

@Component
export default class NewsPage extends Vue {
  @Prop()
  slug: string;

  newsModel: NewsModel = new NewsModel();

  async fetch() {
    const id = this.$serviceLocator.getService(EmptyService).getIdBySlug(this.slug);
    this.newsModel = await this.getNewsModelById(id);
    this.updateBreadCrumbs();
  }

  @Cacheable(0)
  async getNewsModelById(id: number) {
    return await this.$serviceLocator.getService(EmptyService).getOneOrDefault(NewsModel, `users/news/${id}`);
  }

  updateBreadCrumbs() {
    const breadCrumbList = [
      { linkName: "Главная", name: "main" },
      { linkName: "Новости", name: "news" },
      { linkName: this.newsModel?.title?.substring(0, 120) + "..." },
    ];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  head() {
    if (!!this.newsModel.meta_slug) {
      this.newsModel.meta_image = this.newsModel.logo?.url || this.newsModel.banner?.url || undefined;
      return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.newsModel, this.$route.fullPath);
    }
  }

  get bannerSrc() {
    return this.newsModel.banner?.url || "/images/default-banner-black.jpg";
  }

  get newsDate() {
    return this.$dayjs(this.newsModel.published_at).format("DD MMMM YYYY");
  }
}
</script>

<style lang="scss"></style>
