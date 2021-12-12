<template>
  <main class="page-wrapper container">
    <div class="flex flex-col">
      <BaseStaticBanner :image-src="bannerUrl" banner-title="Не понятно что брать в заголовок"></BaseStaticBanner>
      <section class="about-page-free-text" v-html="firstContent"></section>
      <section class="flex flex-col lg:flex-row mt-30 md:mt-60 w-auto lg:w-5/6 ml-auto mr-auto items-center justify-center">
        <img :src="firstImageSrc" loading="lazy" class="w-full" />
        <img :src="secondImageSrc" loading="lazy" class="w-full ml-0 lg:ml-20 mt-30 lg:mt-0" />
      </section>
      <section class="about-page-free-text" v-html="lastContent"></section>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AboutPageModel from "../models/AboutPageModel";
import { PagesContentService } from "../PagesContentService";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";

@Component
export default class AboutPage extends Vue {
  aboutModel: AboutPageModel = new AboutPageModel();

  async created() {
    this.aboutModel = await this.$serviceLocator.getService(PagesContentService).getMainPage();
  }

  get bannerUrl() {
    return this.aboutModel?.banner?.url || null;
  }

  get firstContent() {
    return this.aboutModel?.content?.text || null;
  }

  get lastContent() {
    return this.aboutModel?.content?.description || null;
  }

  get firstImageSrc() {
    return this.aboutModel?.content_image_1?.url || null;
  }

  get secondImageSrc() {
    return this.aboutModel?.content_image_2?.url || null;
  }

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.aboutModel, this.$route.fullPath);
  }
}
</script>

<style lang="scss">
.about-page-free-text {
  @apply mt-30 lg:mt-60 w-auto xl:w-1/2 ml-auto mr-auto;
}
</style>
