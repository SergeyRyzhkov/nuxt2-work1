<template>
  <LazyBaseSwiper :slides="slideList" :arrows="false" :settings="{ slidesPerView: 1, spaceBetween: 0, slidesPerGroup: 1 }">
    <template #slide="{ slide }">
      <div class="w-screen relative">
        <img
          v-lazyimg="getSliderImage(slide)"
          height="770"
          width="1600"
          alt=" "
          class="h-300 lg:h-770 object-cover object-left-top w-full"
        />
      </div>
      <div class="absolute w-screen left-0 top-40 lg:top-185">
        <div class="container">
          <div class="ml-0 lg:ml-100">
            <div
              class="uppercase font-compact text-68 lg:text-124 lg:leading-120 mb-12 lg:mb-22 max-w-[500px]"
              :style="getTitleColor(slide)"
            >
              {{ slide.title }}
            </div>
            <div class="text-12 lg:text-16 font-semibold" :style="getSubTitleColor(slide)">{{ slide.subtitle }}</div>
            <base-button v-if="slide.button" class="bg-white w-max mt-24 lg:mt-40" @click="goTo(slide)">{{
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
