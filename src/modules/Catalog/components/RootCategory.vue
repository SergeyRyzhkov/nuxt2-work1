<template>
  <div v-if="!$fetchState.pending">
    <BaseStaticBanner :image-src="bannerSrc" :is-container="true" default-image="/images/default-banner-black.jpg">
      <div class="absolute flex h-full w-full flex-col items-center justify-between p-20 md:p-60">
        <div class="font-compact text-60 md:text-100 uppercase">{{ bannerTitle }}</div>
        <div class="text-18" v-html="bannerDescription"></div>
        <base-button v-if="!!bannerButtonText" class="mt-18 w-max flex-shrink-0 bg-white lg:mt-0" @click="gotoFromBanner()">{{
          bannerButtonText
        }}</base-button>
      </div>
    </BaseStaticBanner>

    <section v-if="!!popular && !!popular.length" class="mt-40 md:mt-60">
      <h2 class="font-compact text-42 uppercase">Популярное</h2>
      <LazyBaseSwiper :slides="popular" class="mt-32" :settings="sliderSettings">
        <template #slide="{ slide }">
          <ProductItem :model="slide"><span class="text-secondary">популярное</span></ProductItem>
        </template>
      </LazyBaseSwiper>
    </section>

    <section class="mt-40 flex w-full flex-col justify-between md:mt-60 md:flex-row">
      <div class="w-full cursor-pointer md:w-1/2" @click="gotoLine1()">
        <img v-lazysrc="lineImg1" alt=" " class="h-200 md:h-300 w-full object-scale-down" height="300" />
        <div class="text-18 mt-16 font-semibold uppercase">{{ lineText1 }}</div>
      </div>
      <div class="w-full cursor-pointer md:ml-32 md:w-1/2" @click="gotoLine2()">
        <img
          v-lazysrc="lineImg2"
          alt=" "
          class="h-200 md:h-300 mt-32 ml-0 w-full object-scale-down md:mt-0 md:ml-32"
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
        <div class="absolute flex h-full w-full flex-col items-center pt-20 md:pt-60">
          <div class="font-compact text-48 uppercase" v-html="bannerTitle2"></div>
          <div class="mt-32 md:mt-44" v-html="bannerDescription2"></div>
          <base-button
            v-if="!!bannerButtonText2"
            class="mt-18 w-max flex-shrink-0 bg-white lg:mt-24"
            @click="gotoFromBanner2()"
            >{{ bannerButtonText2 }}</base-button
          >
        </div>
      </BaseStaticBanner>
    </section>
    <section v-if="!!bestSellers && !!bestSellers.length" class="mt-40 md:mt-60">
      <h2 class="font-compact text-42 uppercase">Хиты продаж</h2>
      <LazyBaseSwiper :slides="bestSellers" class="mt-32" :settings="sliderSettings">
        <template #slide="{ slide }">
          <ProductItem :model="slide"><span>HIT</span></ProductItem>
        </template>
      </LazyBaseSwiper>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import CatalogModel from "../models/CatalogModel";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";

@Component
export default class RootCategory extends Vue {
  model: CatalogModel = new CatalogModel();

  async fetch() {
    this.model = await this.$serviceLocator.getService(CatalogService).getCatalog();
  }

  head() {
    if (this.model) {
      return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.model, this.$route.fullPath);
    }
  }

  gotoFromBanner() {
    if (this.model?.content?.banner1?.link) {
      window.open(this.model.content.banner1.link, "_blank");
    }
  }

  gotoFromBanner2() {
    if (this.model?.content?.banner2?.link) {
      window.open(this.model.content.banner2.link, "_blank");
    }
  }

  gotoLine1() {
    if (this.model?.content?.line?.length > 0) {
      window.open(this.model.content.line[1].link, "_blank");
    }
  }

  gotoLine2() {
    if (this.model?.content?.line?.length) {
      window.open(this.model.content.line[0].link, "_blank");
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

  get sliderSettings() {
    return {
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 16,
          slidesPerGroup: 2,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
          slidesPerGroup: 3,
        },
      },
    };
  }
}
</script>

<style lang="scss"></style>
