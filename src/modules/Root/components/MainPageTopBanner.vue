<template>
  <LazyBaseSwiper
    :slides="slideList"
    :arrows="false"
    :settings="{
      slidesPerView: 1,
      spaceBetween: 0,
      slidesPerGroup: 1,
      autoplay: {
        delay: 5000,
      },
    }"
  >
    <template #slide="{ slide }">
      <div class="relative w-screen">
        <img
          v-lazysrc="getSliderImage(slide)"
          height="770"
          width="1600"
          alt=" "
          class="h-300 lg:h-770 w-full object-cover object-left-top"
        />
      </div>
      <div class="lg:top-185 absolute left-0 top-40 w-screen">
        <div class="container">
          <div class="lg:ml-100 ml-0">
            <div
              class="font-compact text-68 lg:mb-22 lg:text-124 lg:leading-120 mb-12 max-w-[500px] uppercase"
              :style="getTitleColor(slide)"
            >
              {{ slide.title }}
            </div>
            <div class="text-12 lg:text-16 font-semibold" :style="getSubTitleColor(slide)">{{ slide.subtitle }}</div>
            <base-button v-if="slide.button" class="mt-24 w-max bg-white lg:mt-40" @click="goTo(slide)">{{
              slide.button_text
            }}</base-button>
          </div>
        </div>
      </div>
    </template>
  </LazyBaseSwiper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import MainPageModel from "../models/MainPageModel";

@Component
export default class MainPageTopBanner extends Vue {
  @Prop()
  model: MainPageModel;

  get slideList() {
    return this.model.slider;
  }

  getSliderImage(slider: any) {
    return slider.image?.url || null;
  }

  goTo(slider: any) {
    window.open(slider.link, "_blank");
  }

  getTitleColor(slider: any) {
    return slider.title_color ? { color: slider.title_color } : { color: "#131313" };
  }

  getSubTitleColor(slider: any) {
    return slider.subtitle_color ? { color: slider.subtitle_color } : { color: "#131313" };
  }
}
</script>
