<template>
  <div>
    <div class="slider-wrapper">
      <template v-for="(item, index) in slides">
        <div :key="index">
          <slot name="slide" :slide="item" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BaseSlider extends Vue {
  @Prop()
  slides: any[];
}
</script>

<style lang="scss">
.slider-wrapper {
  position: relative;
  overflow: visible;
  display: flex;
  user-select: none;
  width: 100%;
  height: 100%;
  transition-property: transform;
  transform: translate3d(0px, 0px, 0px);
  will-change: transform;
  transition-property: transform;
  transition-duration: 600ms;
}
</style>
