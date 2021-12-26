<template>
  <section
    class="w-full flex relative overflow-hidden h-220 md:h-400 mb-20 lg:mb-40 xl:mb-60 bg-strong-nude"
    :class="[!isContainer ? 'w-screen' : '']"
  >
    <img v-lozad="imageSrc" height="406" class="object-cover object-left-top w-full max-w-full h-200 md:h-400" />
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BaseStaticBanner extends Vue {
  @Prop()
  imageSrc: string;

  @Prop({ default: false })
  isContainer: boolean;
}
</script>
