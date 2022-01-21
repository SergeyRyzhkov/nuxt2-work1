<template>
  <div class="page-wrapper">
    <BaseStaticBanner v-if="bannerSrc" :image-src="bannerSrc" />
    <main class="container mt-40">
      <div class="flex flex-col-reverse md:flex-row">
        <div class="w-full mt-32 md:mt-0 md:w-1/4">
          {{ newsDate }}
        </div>
        <div class="w-full md:w-1/2">
          <h1>{{ newsModel.title }}</h1>
          <LazyHydrate never>
            <section class="mt-30 md:mt-60" v-html="newsModel.text"></section>
          </LazyHydrate>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, getModule } from "nuxt-property-decorator";
import LazyHydrate from "vue-lazy-hydration";
import NewsModel from "../models/NewsModel";
import AppStore from "../store/AppStore";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import { EmptyService } from "@/_core/service/EmptyService";

@Component({
  components: {
    LazyHydrate,
  },
})
export default class NewsPage extends Vue {
  @Prop()
  id: number;

  newsModel: NewsModel = new NewsModel();

  async fetch() {
    this.newsModel = await this.$serviceLocator.getService(EmptyService).getOneOrDefault(NewsModel, `users/news/${this.id}`);
    this.updateBreadCrumbs();
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
    return this.newsModel.banner?.url || undefined;
  }

  get newsDate() {
    return this.$dayjs(this.newsModel.published_at).format("DD MMMM YYYY");
  }
}
</script>

<style lang="scss"></style>
