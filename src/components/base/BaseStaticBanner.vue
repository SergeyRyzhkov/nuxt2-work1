<template>
  <section class="banner-image-wrapper">
    <img :src="imageSrc" height="406" class="banner-image" />
    <h1 class="banner-image__title">{{ bannerTitle }}</h1>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BaseStaticBanner extends Vue {
  @Prop()
  imageSrc: string;

  @Prop()
  bannerTitle: string;
}
</script>
<style lang="scss">
.banner-image-wrapper {
  display: flex;
  position: relative;
  height: 210px;
  overflow: hidden;
  width: 100%;

  .banner-image {
    height: 406px;
    width: 100%;
    max-width: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: left;
    object-position: left;
    // border-radius: 5px !important;
  }
  .banner-image__title {
    width: 100%;
    height: 100%;
    color: #fff;
    font-weight: 500;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    padding-left: 60px;
    align-items: center;
    position: absolute;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>
