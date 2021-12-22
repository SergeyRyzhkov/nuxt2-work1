<template>
  <section
    class="banner-image-wrapper h-220 md:h-400 mb-20 lg:mb-40 xl:mb-60"
    :class="[imageSrc ? 'w-screen' : 'container-fluid bg-strong-nude']"
  >
    <img :src="imageSrc" height="406" class="banner-image h-200 md:h-400" />
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BaseStaticBanner extends Vue {
  @Prop()
  imageSrc: string;

  // @Prop()
  // bannerTitle: string;
}
</script>
<style lang="scss">
.banner-image-wrapper {
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;

  .banner-image {
    width: 100%;
    max-width: 100%;
    object-fit: cover;
    object-position: top;
  }
}
</style>
