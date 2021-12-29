<template>
  <div v-if="!$fetchState.pending">
    <BaseStaticBanner :image-src="bannerSrc" :is-container="true" default-image="/images/default-banner-black.jpg">
      <div class="absolute w-full h-full flex flex-col items-center justify-between p-20 md:p-60">
        <div class="font-compact text-60 md:text-100 uppercase">{{ bannerTitle }}</div>
        <div v-html="bannerDescription"></div>
        <base-button>{{ bannerButtonText }}</base-button>
      </div>
    </BaseStaticBanner>

    <section class="mt-40 md:mt-60">
      <h2 class="text-42 font-compact uppercase">Популярное</h2>
      <div class="mt-16 md:mt-32 flex flex-nowrap overflow-x-auto">
        <ProductItem v-for="(index, iter) in popular" :key="index" :model="iter" class="first:ml-0 ml-16 md:ml-32" />
      </div>
    </section>

    <section class="mt-40 md:mt-60 flex flex-col md:flex-row w-full">
      <img v-lozad="lineImg1" alt=" " class="object-cover object-top md:w-1/2 w-full h-200 md:h-300" height="300" />
      <img
        v-lozad="lineImg2"
        alt=" "
        class="object-cover object-top md:w-1/2 w-full h-200 md:h-300 mt-32 md:mt-0 ml-0 md:ml-32"
        height="300"
      />
    </section>
    <section class="mt-40 md:mt-60">
      <BaseStaticBanner :image-src="bannerSrc2" :is-container="true" default-image="/images/default-banner-black.jpg">
        <div class="absolute w-full h-full flex flex-col items-center pt-20 md:pt-100">
          <div class="font-compact text-48 uppercase" v-html="bannerTitle2"></div>
          <base-button class="mt-24">{{ bannerButtonText2 }}</base-button>
        </div>
      </BaseStaticBanner>
    </section>
    <section class="mt-40 md:mt-60">
      <h2 class="text-42 font-compact uppercase">Хиты продаж</h2>
      <div class="mt-16 md:mt-32 flex flex-nowrap overflow-x-auto">
        <ProductItem v-for="(index, iter) in popular" :key="index" :model="iter" class="first:ml-0 ml-16 md:ml-32" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { EmptyService } from "@/_core/service/EmptyService";
import SeoModel from "@/_core/models/SeoModel";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import { ProfileService } from "@/modules/Profile/ProfileService";

class CatalogDescription extends SeoModel {
  banner: { url: string };
  banner2: { url: string };
  content_image_1: { url: string };
  content_image_2: { url: string };
  content: {
    banner1: { title: string; description: string; button_text: string };
    banner2: { title: string; description: string; button_text: string };
    bestsellers: [];
    line: { titel: string }[];
    popular: [];
  };
}

@Component
export default class RootCategory extends Vue {
  model: CatalogDescription | null = null;

  async fetch() {
    this.model = await this.$serviceLocator.getService(EmptyService).getAnyOrNull("users/pages/catalog");
  }

  head() {
    if (this.model) {
      return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.model, this.$route.fullPath);
    }
  }

  get bannerSrc() {
    return this.model?.banner?.url;
  }

  get bannerTitle() {
    return this.model?.content?.banner1.title || "";
  }

  get bannerDescription() {
    return this.model?.content?.banner1.description || "";
  }

  get bannerButtonText() {
    return this.model?.content?.banner1.button_text || "";
  }

  get lineImg1() {
    return this.model?.content_image_1?.url || "";
  }

  get lineImg2() {
    return this.model?.content_image_2?.url || "";
  }

  get bannerSrc2() {
    return this.model?.banner2?.url;
  }

  get bannerTitle2() {
    return this.model?.content?.banner2.title || "";
  }

  get bannerDescription2() {
    return this.model?.content?.banner2.description || "";
  }

  get bannerButtonText2() {
    return this.model?.content?.banner2.button_text || "";
  }

  get popular() {
    return this.$serviceLocator.getService(ProfileService).getFavorites();
  }
}
</script>

<style lang="scss"></style>
