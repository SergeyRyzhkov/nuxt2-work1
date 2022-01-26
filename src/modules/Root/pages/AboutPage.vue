<template>
  <main class="page-wrapper">
    <BaseStaticBanner v-if="!!bannerUrl" :image-src="bannerUrl" default-image="/images/about_default_banner.jpg">
      <div class="absolute w-screen bottom-30 md:bottom-60">
        <h1 class="container w-full md:w-1/2 text-white">
          Добро пожаловать в <br />
          KAYPRO
        </h1>
      </div>
    </BaseStaticBanner>
    <main class="container flex flex-col">
      <section class="w-auto xl:w-1/2 ml-auto mr-auto" v-html="firstContent"></section>
      <section class="flex flex-col lg:flex-row mt-30 md:mt-60 w-auto lg:w-5/6 ml-auto mr-auto items-center justify-center">
        <img v-lazysrc="firstImageSrc" class="w-full" />
        <img v-lazysrc="secondImageSrc" class="w-full ml-0 lg:ml-20 mt-30 lg:mt-0" />
      </section>
      <section class="mt-30 lg:mt-60 w-auto xl:w-1/2 ml-auto mr-auto" v-html="lastContent"></section>
    </main>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AboutPageModel from "../models/AboutPageModel";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import { EmptyService } from "@/_core/service/EmptyService";

@Component
export default class AboutPage extends Vue {
  aboutModel: AboutPageModel = new AboutPageModel();

  async created() {
    this.aboutModel = await this.$serviceLocator.getService(EmptyService).getAnyOrNull("users/pages/about");
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
