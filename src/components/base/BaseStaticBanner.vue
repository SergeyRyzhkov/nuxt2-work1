<template>
  <div
    class="relative mb-20 flex w-full flex-col overflow-hidden lg:mb-40 xl:mb-60"
    :class="[!isContainer ? 'w-screen' : '', wide ? 'h-400 md:h-600' : 'h-200 md:h-400']"
  >
    <img
      v-if="image"
      :src="image"
      :height="height"
      alt=" "
      class="w-full max-w-full object-cover object-top"
      :class="[wide ? 'h-400 md:h-600' : 'h-200 md:h-400']"
    />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BaseStaticBanner extends Vue {
  @Prop({ default: false })
  wide;

  @Prop()
  imageSrc: string;

  @Prop({ default: true })
  isContainer: boolean;

  @Prop()
  defaultImage: string;

  get image() {
    return this.imageSrc || this.defaultImage || null;
  }

  get height() {
    return this.wide ? "600" : "400";
  }
}
</script>
