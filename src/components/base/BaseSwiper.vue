<template>
  <client-only>
    <div class="swiper-container" :class="[swiperRootClassName, swiperContainerClasses]">
      <div class="swiper-wrapper">
        <div v-for="(slide, index) in slides" :key="index" :class="silderClasses">
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

      <div v-if="pagination" class="swiper-pagination"></div>
    </div>
  </client-only>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import { Swiper, Navigation, Pagination, Autoplay, SwiperOptions } from "swiper";
import { Guid } from "@/utils/Guid";

import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
Swiper.use([Navigation, Pagination, Autoplay]);

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
  slidersClasses: string;

  @Prop()
  swiperContainerClasses: any[];

  @Prop({ default: true })
  dontShrinkSlider: boolean;

  get silderClasses() {
    return ["swiper-slide", this.slidersClasses];
  }

  id: string = Guid.newGuid();
  get swiperRootClassName() {
    return `swiper-${this.id}`;
  }

  swiperInstance: Swiper = {} as Swiper;

  defaultSettings = {
    slidesPerView: "auto",
    // centeredSlides: true,
    spaceBetween: 16,
    // simulateTouch: true,
    // watchSlidesVisibility: true,
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,

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

  async mounted() {
    await this.$nextTick();
    this.initSwiper();
  }

  async initSwiper() {
    await this.$nextTick();
    await this.$nextTick();
    const combinedSettings = { ...this.defaultSettings, ...this.settings };
    // eslint-disable-next-line no-new
    this.swiperInstance = new Swiper(`.${this.swiperRootClassName}`, combinedSettings as any);
    // var swiper = this.swiperInstance;
    // var interleaveOffset = 0.5;
    // this.swiperInstance.on('touchStart', () => {
    //   swiper.update()
    //   swiper.updateProgress()
    //     swiper.slides[swiper.activeIndex].style.transition = "";
    // })
    // swiper.translateTo(300, 100, false, false)
    // this.swiperInstance.on('progress', () => {
    //       let index = swiper.activeIndex + 1
    //       var slideProgress = swiper.slides[index].progress;
    //       var innerOffset = swiper.height * interleaveOffset;
    //       var innerTranslate = slideProgress * innerOffset;
    //       // eslint-disable-next-line no-new
    //   console.log(swiper.slides);
    //   swiper.slides[index].style.width = innerTranslate + 'px !important'
    //       swiper.slides[index].style.height = innerTranslate + 'px !important'
    //       swiper.slides[index].style.transform =
    //         `translate(0px, ${innerTranslate}px)`
    //
    // });
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
.swiper-slide {
  // flex-shrink: 0;
  // min-width: 100%;
  width: auto;
  cursor: pointer;
}

.swiper-navigation {
  position: absolute;
  width: 100%;
  top: 45%;
  display: flex;
  justify-content: space-between;
  z-index: 100;
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
  border-radius: 99999px;
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
