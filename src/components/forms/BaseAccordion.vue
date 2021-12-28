<template>
  <div class="base-accordion">
    <div class="flex font-semibold text-18 justify-between items-center cursor-pointer" @click="toogle()">
      <slot name="header"></slot>
      <span v-show="!isContentActive" class="text-28 font-normal">+</span>
      <span v-show="isContentActive" class="text-28 font-normal">-</span>
    </div>
    <div class="base-accordion__content" :class="[isContentActive ? 'active' : '']">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class BaseAccordion extends Vue {
  isContentActive = false;

  toogle() {
    this.isContentActive = !this.isContentActive;
  }
}
</script>

<style lang="scss">
.base-accordion {
  border-bottom: 1px solid #c9c9c9;
  padding: 18px 0px 18px 0px;
  > span {
    transition: 0.2s;
    line-height: 0px;
    outline: none;
  }
  &__content {
    transition: 0.2s;
    max-height: 0px;
    overflow-y: hidden;
    margin-top: 0px;
    &.active {
      max-height: 300px;
      margin-top: 16px;
    }
  }
}
</style>
