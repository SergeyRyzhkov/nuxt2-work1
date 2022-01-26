<template>
  <LazyBaseSwiper :slides="slideList" :arrows="false" :settings="{ slidesPerView: 1, spaceBetween: 0, slidesPerGroup: 1 }">
    <template #slide="{ slide }">
      <div class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-1/2 h-300 lg:h-600 border-r-2 border-secondary">
          <BaseVideoPlayer
            v-if="getVideo(slide) && isVideo(slide)"
            :src="getVideo(slide)"
            class="w-full h-full bg-[#F5F5F5]"
            video-classes="w-full h-full"
            controls
          ></BaseVideoPlayer>
          <img v-if="!isVideo(slide)" v-lazyimg="getLeftIamgeSrc(slide)" class="h-full w-full object-cover object-left-top" />
        </div>
        <div class="w-full lg:w-1/2 h-full lg:h-600">
          <div class="bg-[#F5F5F5] h-full flex flex-col items-center py-50 px-16">
            <img v-lazyimg="getSliderImage(slide)" height="300" width="250" alt=" " class="h-300 object-scale-down w-250" />
            <div :style="getTitleColor(slide)" class="mt-27">
              {{ slide.title }}
            </div>
            <div :style="getSubTitleColor(slide)" class="mt-18">
              {{ slide.description }}
            </div>
            <base-button v-if="slide.button" class="bg-white w-max mt-30" @click="goTo(slide)">{{
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
export default class MainPageFirstLineSlider extends Vue {
  @Prop()
  model: MainPageModel;

  get slideList() {
    return this.model?.slider_line;
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

  isVideo(slider: any) {
    return slider.media?.mime_type?.indexOf("video") > -1;
  }

  getVideo(slider: any) {
    return slider.media?.url || null;
  }

  getLeftIamgeSrc(slider: any) {
    return slider.media?.url || null;
  }
}
</script>
