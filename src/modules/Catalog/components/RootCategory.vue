<template>
  <div v-if="!$fetchState.pending">
    <BaseStaticBanner :image-src="bannerSrc" :is-container="true" default-image="/images/default-banner-black.jpg">
      <div class="absolute w-full h-full flex flex-col items-center justify-between p-20 md:p-60">
        <div class="font-compact text-60 md:text-100 uppercase">{{ bannerTitle }}</div>
        <div class="text-18" v-html="bannerDescription"></div>
        <base-button class="grow flex-shrink-0 mt-18 lg:mt-0 bg-white w-max">{{ bannerButtonText }}</base-button>
      </div>
    </BaseStaticBanner>

    <section v-if="!!popular" class="mt-40 md:mt-60">
      <h2 class="text-42 font-compact uppercase">Популярное</h2>
      <LazyHydrate when-visible>
        <LazyBaseSwiper :slides="popular" class="mt-32">
          <template #slide="{ slide }">
            <ProductItem :model="slide" class="w-max"></ProductItem>
          </template>
        </LazyBaseSwiper>
      </LazyHydrate>
    </section>

    <section class="mt-40 md:mt-60 flex flex-col md:flex-row w-full justify-between">
      <div class="w-full md:w-1/2">
        <img v-lozad="lineImg1" alt=" " class="object-cover object-top w-full h-200 md:h-300" height="300" />
        <div class="text-18 mt-16 font-semibold uppercase">{{ lineText1 }}</div>
      </div>
      <div class="w-full md:w-1/2 md:ml-32">
        <img
          v-lozad="lineImg2"
          alt=" "
          class="object-cover object-top w-full h-200 md:h-300 mt-32 md:mt-0 ml-0 md:ml-32"
          height="300"
        />
        <div class="text-18 mt-16 font-semibold uppercase">{{ lineText2 }}</div>
      </div>
    </section>
    <section class="mt-40 md:mt-60">
      <BaseStaticBanner
        :image-src="bannerSrc2"
        :is-container="true"
        default-image="/images/default-banner-black.jpg"
        class="md:h-300"
      >
        <div class="absolute w-full h-full flex flex-col items-center pt-20 md:pt-60">
          <div class="font-compact text-48 uppercase" v-html="bannerTitle2"></div>
          <div class="mt-32 md:mt-44" v-html="bannerDescription2"></div>
          <base-button class="grow flex-shrink-0 mt-18 lg:mt-24 bg-white w-max">{{ bannerButtonText2 }}</base-button>
        </div>
      </BaseStaticBanner>
    </section>
    <section v-if="!!bestSellers" class="mt-40 md:mt-60">
      <h2 class="text-42 font-compact uppercase">Хиты продаж</h2>
      <LazyHydrate when-visible>
        <LazyBaseSwiper :slides="bestSellers" class="mt-32">
          <template #slide="{ slide }">
            <ProductItem :model="slide" class="w-max"></ProductItem>
          </template>
        </LazyBaseSwiper>
      </LazyHydrate>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import LazyHydrate from "vue-lazy-hydration";
import ProductModel from "../models/ProductModel";
import { EmptyService } from "@/_core/service/EmptyService";
import SeoModel from "@/_core/models/SeoModel";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";

class CatalogDescription extends SeoModel {
  banner: { url: string };
  banner2: { url: string };
  content_image_1: { url: string };
  content_image_2: { url: string };
  content: {
    banner1: { title: string; description: string; button_text: string };
    banner2: { title: string; description: string; button_text: string };
    bestsellers: ProductModel[];
    line: { title: string }[];
    popular: ProductModel[];
  };
}

@Component({
  components: {
    LazyHydrate,
  },
})
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

  get lineText1() {
    return this.model?.content?.line[0]?.title || "";
  }

  get lineText2() {
    return this.model?.content?.line[1]?.title || "";
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
    return this.model?.content?.popular || null;
  }

  get bestSellers() {
    return this.model?.content?.bestsellers || null;
  }
}
</script>

<style lang="scss"></style>
