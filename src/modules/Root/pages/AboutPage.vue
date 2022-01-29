<template>
  <main class="page-wrapper">
    <BaseStaticBanner v-if="!!bannerUrl" :image-src="bannerUrl" default-image="/images/about_default_banner.jpg">
      <div class="absolute bottom-30 w-screen md:bottom-60">
        <h1 class="container w-full text-white md:w-1/2">
          Добро пожаловать в <br />
          KAYPRO
        </h1>
      </div>
    </BaseStaticBanner>
    <main class="container flex flex-col">
      <section class="ml-auto mr-auto w-auto xl:w-1/2" v-html="firstContent"></section>
      <section class="mt-30 ml-auto mr-auto flex w-auto flex-col items-center justify-center md:mt-60 lg:w-5/6 lg:flex-row">
        <img v-lazysrc="firstImageSrc" class="w-full" />
        <img v-lazysrc="secondImageSrc" class="ml-0 mt-30 w-full lg:ml-20 lg:mt-0" />
      </section>
      <section class="mt-30 ml-auto mr-auto w-auto lg:mt-60 xl:w-1/2" v-html="lastContent"></section>
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
