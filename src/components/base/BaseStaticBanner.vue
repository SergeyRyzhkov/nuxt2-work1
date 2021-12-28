<template>
  <section
    class="w-full flex flex-col relative overflow-hidden mb-20 lg:mb-40 xl:mb-60"
    :class="[!isContainer ? 'w-screen' : '', wide ? 'h-400 md:h-600' : 'h-200 md:h-400']"
  >
    <img
      :src="image"
      :height="height"
      alt=" "
      class="object-cover object-left-top w-full max-w-full"
      :class="[wide ? 'h-400 md:h-600' : 'h-200 md:h-400']"
    />
    <slot></slot>
  </section>
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
