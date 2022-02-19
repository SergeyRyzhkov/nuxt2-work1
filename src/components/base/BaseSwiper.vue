<template>
  <client-only>
    <div>
      <div class="swiper-container" :class="[swiperRootClassName, containerClasses]">
        <slot name="before-main-swiper-wrapper" />
        <div class="swiper-wrapper">
          <div v-for="(slide, index) in slides" :key="index" :class="sldClasses">
            <slot name="slide" :slide="slide"></slot>
          </div>
        </div>

        <div v-show="!!slides && slides.length && arrows" class="swiper-navigation">
          <button type="button" class="swiper-button-prev">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
              <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path>
            </svg>
          </button>
          <button type="button" class="swiper-button-next">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
              <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path>
            </svg>
          </button>
        </div>

        <div v-if="pagination" class="swiper-pagination block md:hidden"></div>
      </div>

      <div v-if="showThumbs" class="swiper-container-thumbs" :class="[swiperThumbsClassName, thumbsContainerClasses]">
        <div class="swiper-wrapper">
          <div v-for="(slide, index) in slides" :key="index + 1000" :class="thumbsSldClasses">
            <slot name="thumbs-slide" :slide="slide">
              <slot name="slide" :slide="slide"></slot>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import { Swiper, Navigation, Pagination, Autoplay, Thumbs, SwiperOptions } from "swiper";
import { Guid } from "@/utils/Guid";

import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
Swiper.use([Navigation, Pagination, Autoplay, Thumbs]);

@Component
export default class BaseSwiper extends Vue {
  @Prop()
  settings: SwiperOptions;

  @Prop()
  slides: any[];

  @Prop({ default: true })
  pagination: boolean;

  @Prop({ default: true })
  arrows: boolean;

  @Prop()
  sliderClasses: string;

  @Prop()
  containerClasses;

  @Prop({ default: false })
  showThumbs: boolean;

  @Prop()
  thumbsSettings: SwiperOptions;

  @Prop()
  thumbsContainerClasses;

  @Prop()
  thumbsSliderClasses: string;

  get sldClasses() {
    return ["swiper-slide", this.sliderClasses];
  }

  get thumbsSldClasses() {
    return ["swiper-slide", this.thumbsSliderClasses];
  }

  id: string = Guid.newGuid();
  get swiperRootClassName() {
    return `swiper-${this.id}`;
  }

  thumbsId: string = Guid.newGuid();
  get swiperThumbsClassName() {
    return `gallery-thumbs-${this.thumbsId}`;
  }

  defaultSettings = {
    slidesPerView: "auto",
    slidesPerGroup: 4,
    spaceBetween: 16,
    grabCursor: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    mousewheel: true,
    resizeObserver: true,
    speed: 1000,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  defaultThumbsSettings = {
    spaceBetween: 0,
    slidesPerView: 2,
    freeMode: true,
    watchSlidesProgress: true,
    grabCursor: true,
    watchSlidesVisibility: true,
    observer: true,
    observeParents: true,
    mousewheel: true,
  };

  async mounted() {
    await this.$nextTick();
    this.initSwiper();
  }

  async initSwiper() {
    await this.$nextTick();
    await this.$nextTick();

    const combinedSettings = {
      ...this.defaultSettings,
      ...this.settings,
    };

    if (this.showThumbs) {
      const combinedThumbsSettings = {
        ...this.defaultThumbsSettings,
        ...this.thumbsSettings,
      };

      const galleryThumbs = new Swiper(`.${this.swiperThumbsClassName}`, combinedThumbsSettings as any);

      combinedSettings.thumbs = {
        swiper: galleryThumbs,
      };
    }
    // eslint-disable-next-line no-new
    new Swiper(`.${this.swiperRootClassName}`, combinedSettings as any);
  }
}
</script>

<style lang="scss">
.swiper-slide {
  transition: 0.3s;
}
.swiper-slide-next {
  transition: 0.3s;
}

.swiper-navigation {
  position: absolute;
  width: 100%;
  top: 45%;
  left: 0px;
  display: none;
  justify-content: space-between;
  z-index: 100;

  @include tablet {
    display: flex;
  }
}
.swiper-button-next,
.swiper-button-prev {
  width: 34px;
  height: 34px;
  background-color: white;
  z-index: 50;
  padding: 10px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid $primary;
  cursor: pointer;
}

.swiper-button-next {
  margin-left: auto;
}
.swiper-button-prev {
  transform: scaleX(-1);
}

.swiper-button-disabled {
  display: none;
}

.swiper-pagination {
  margin-top: 32px;
  position: relative;
  text-align: center;
  transform: translate3d(0, 0, 0);
  z-index: 10;
  .swiper-pagination-bullet {
    width: 8px;
    background-color: $primary;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
    opacity: 0.2;
    margin: 0 4px;
    transition: 300ms opacity;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
  }
}
</style>
