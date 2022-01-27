<template>
  <main class="page-wrapper">
    <MainPageTopBannerSkeleton v-show="!isLoaded"></MainPageTopBannerSkeleton>
    <MainPageTopBanner v-show="isLoaded" :model="model"></MainPageTopBanner>

    <!-- content.new_products -->
    <section v-if="!!newProducts" class="container mt-40 md:mt-100">
      <h2 class="text-48 font-compact uppercase">Новые поступления</h2>
      <LazyBaseSwiper :slides="newProducts" class="mt-16 md:mt-32" :settings="sliderSettings">
        <template #slide="{ slide }">
          <ProductItem :model="slide" class="w-max"><span class="text-green">Новое</span></ProductItem>
        </template>
      </LazyBaseSwiper>
    </section>

    <LazyHydrate when-visible>
      <section class="container mt-40 md:mt-100">
        <MainPageFirstLineSlider :model="model"></MainPageFirstLineSlider>
      </section>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <!-- content.bestsellers -->
      <section class="container mt-40 md:mt-100">
        <h2 class="text-48 font-compact uppercase">Хиты продаж</h2>
        <LazyBaseSwiper :slides="bestSellers" class="mt-16 md:mt-32" :settings="sliderSettings">
          <template #slide="{ slide }">
            <ProductItem :model="slide" class="w-max"><span>HIT</span></ProductItem>
          </template>
        </LazyBaseSwiper>
      </section>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <section class="container mt-40 md:mt-100">
        <MainPageProduct :model="model"></MainPageProduct>
      </section>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <!-- content.popular -->
      <section v-if="!!populars" class="container mt-40 md:mt-100">
        <h2 class="text-48 font-compact uppercase">Популярное</h2>
        <LazyBaseSwiper :slides="populars" class="mt-16 md:mt-32" :settings="sliderSettings">
          <template #slide="{ slide }">
            <ProductItem :model="slide" class="w-max"><span class="text-secondary">популярное</span></ProductItem>
          </template>
        </LazyBaseSwiper>
      </section>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <section class="container mt-40 md:mt-100">
        <div class="flex flex-col lg:flex-row">
          <div class="w-full lg:w-1/2 cursor-pointer" @click="goToLine21">
            <img v-lazysrc="line2ImgSrc1" height="500" width="300" class="h-210 lg:h-400 w-full object-cover object-left-top" />
            <div class="mt-16 lg:mt-26 text-18 font-semibold uppercase">{{ line2Title1 }}</div>
          </div>
          <div class="w-full lg:w-1/2 ml-0 lg:ml-20 cursor-pointer mt-32 lg:mt-0" @click="goToLine22">
            <img v-lazysrc="line2ImgSrc2" height="500" width="300" class="h-210 lg:h-400 w-full object-cover object-left-top" />
            <div class="mt-16 lg:mt-26 text-18 font-semibold uppercase">{{ line2Title2 }}</div>
          </div>
        </div>
      </section>
    </LazyHydrate>

    <section class="container mt-40 md:mt-100">
      <div class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-1/2 bg-primary flex flex-col px-16 py-48">
          <div class="lg:w-4/5 flex flex-col m-auto">
            <h2 class="text-78 md:text-89 font-compact uppercase text-white">
              KayPro-всегда доступен для<br />
              новых свершений
            </h2>
            <span class="mt-14 text-white"
              >Мобильное приложение уже доступно <br />
              для скачивания.</span
            >
            <div class="mt-32 lg:mt-48 flex items-center">
              <img v-lazysrc="'/images/app_store.svg'" class="w-140 h-42" alt=" " width="140" height="42" />
              <img v-lazysrc="'/images/google_play.svg'" class="ml-16 w-140 h-42" alt=" " width="140" height="42" />
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/2 bg-nude h-340 lg:h-full">
          <img
            v-lazysrc="'/images/main-apps.png'"
            class="h-full w-full object-cover object-left-top"
            alt=" "
            height="650"
            width="720"
          />
        </div>
      </div>
    </section>

    <LazyHydrate when-visible>
      <!-- instagram -->
      <section class="mt-40 md:mt-185">
        <InstagramBlock />
      </section>
    </LazyHydrate>

    <section class="container mt-40 md:mt-100 flex flex-col">
      <div class="flex flex-col ml-auto mr-auto items-center">
        <h2 class="text-62 font-compact">Доступ к оптовым ценам</h2>
        <span class="mt-14">Заполните заявку на сотрудничество</span>
        <base-button class="mt-20 md:mt-40 w-max" @click="openForm()">Заполнить</base-button>
      </div>
    </section>

    <LazyHydrate when-visible>
      <section class="mt-40 md:mt-100">
        <LazySnakeComponent />
      </section>
    </LazyHydrate>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import LazyHydrate from "vue-lazy-hydration";
import MainPageModel from "../models/MainPageModel";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import CooperationForm from "@/components/CooperationForm.vue";
import { EmptyService } from "@/_core/service/EmptyService";

@Component({
  components: {
    LazyHydrate,
  },
})
export default class MainPage extends Vue {
  model: MainPageModel = new MainPageModel();

  async fetch() {
    this.model = await this.$serviceLocator.getService(EmptyService).getAnyOrNull("users/pages/home");
    this.model.loaded = true;
  }

  get isLoaded() {
    return process.client && !!this.model && this.model.loaded;
  }

  get bannerSrc() {
    return null;
  }

  get bannerTitle() {
    return null;
  }

  get bannerDescription() {
    return null;
  }

  get bannerButtonText() {
    return null;
  }

  get newProducts() {
    return this.model.content?.new_products;
  }

  get populars() {
    return this.model.content?.popular;
  }

  get bestSellers() {
    return this.model.content?.bestsellers;
  }

  get line2Title1() {
    return this.model.content?.line_2 && this.model.content?.line_2.length && this.model.content?.line_2.length > 0
      ? this.model.content.line_2[0].title
      : "";
  }

  get line2Title2() {
    return this.model.content?.line_2 && this.model.content?.line_2.length && this.model.content?.line_2.length > 1
      ? this.model.content.line_2[1].title
      : "";
  }

  get line2ImgSrc1() {
    return this.model.content_image_1?.url;
  }

  get line2ImgSrc2() {
    return this.model.content_image_2?.url;
  }

  goToLine21() {
    const url =
      this.model.content?.line_2 && this.model.content?.line_2.length && this.model.content?.line_2.length > 1
        ? this.model.content.line_2[0].link
        : "";
    window.open(url, "_blank");
  }

  goToLine22() {
    const url =
      this.model.content?.line_2 && this.model.content?.line_2.length && this.model.content?.line_2.length > 1
        ? this.model.content.line_2[1].link
        : "";
    window.open(url, "_blank");
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
          slidesPerView: 4,
          spaceBetween: 40,
          slidesPerGroup: 4,
        },
      },
    };
  }

  head() {
    if (this.model) {
      return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.model, this.$route.fullPath);
    }
  }

  openForm() {
    this.$modalManager.modalShow(CooperationForm, {}, { classes: "v--modal vue-dialog-w-max" });
  }
}
</script>
