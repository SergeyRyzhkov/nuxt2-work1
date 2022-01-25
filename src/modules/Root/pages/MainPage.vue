<template>
  <main class="page-wrapper">
    <BaseStaticBanner :image-src="bannerSrc" :is-container="true" default-image="/images/default-banner-black.jpg">
      <div class="absolute w-full h-full flex flex-col items-center justify-between p-20 md:p-60">
        <div class="font-compact text-60 md:text-100 uppercase">{{ bannerTitle }}</div>
        <div v-html="bannerDescription"></div>
        <base-button>{{ bannerButtonText }}</base-button>
      </div>
    </BaseStaticBanner>

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
        <h2 class="text-48 font-compact uppercase">Первая линейка</h2>
      </section>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <!-- content.bestsellers -->
      <section class="container mt-40 md:mt-100">
        <h2 class="text-48 font-compact uppercase">Хиты продаж</h2>
        <LazyHydrate when-visible>
          <LazyBaseSwiper :slides="bestSellers" class="mt-16 md:mt-32" :settings="sliderSettings">
            <template #slide="{ slide }">
              <ProductItem :model="slide" class="w-max"><span>HIT</span></ProductItem>
            </template>
          </LazyBaseSwiper>
        </LazyHydrate>
      </section>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <section class="container mt-40 md:mt-100">
        <h2 class="text-48 font-compact uppercase">Вторая линейка</h2>
      </section>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <!-- content.popular -->
      <section class="container mt-40 md:mt-100">
        <h2 class="text-48 font-compact uppercase">Популярное</h2>
        <LazyHydrate when-visible>
          <LazyBaseSwiper :slides="populars" class="mt-16 md:mt-32" :settings="sliderSettings">
            <template #slide="{ slide }">
              <ProductItem :model="slide" class="w-max"><span class="text-secondary">популярное</span></ProductItem>
            </template>
          </LazyBaseSwiper>
        </LazyHydrate>
      </section>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <section class="container mt-40 md:mt-100">
        <h2 class="text-48 font-compact uppercase">Трейтья линейка</h2>
      </section>
    </LazyHydrate>

    <section class="container mt-40 md:mt-100 flex flex-col md:flex-row">
      <div class="w-full md:w-1/2 bg-primary flex flex-col">
        <div class="my-auto mx-12 md:mx-60">
          <h2 class="text-78 md:text-89 font-compact uppercase text-white">
            KayPro-всегда доступен для<br />
            новых свершений
          </h2>
          <span class="mt-20 md:mt-28 text-white"
            >Мобильное приложение уже доступно <br />
            для скачивания.</span
          >
          <div class="mt-32 md:mt-60 flex items-center">
            <img v-lazyimg="'/images/app_store.svg'" alt=" " width="140" height="42" />
            <img v-lazyimg="'/images/google_play.svg'" class="ml-16" alt=" " width="140" height="42" />
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 bg-nude">
        <img v-lazyimg="'/images/main-apps.png'" alt=" " height="680" width="630" />
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
        <SnakeComponent />
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
