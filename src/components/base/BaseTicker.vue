<template>
  <client-only>
    <dynamic-marquee v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </dynamic-marquee>
  </client-only>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
const DynamicMarquee = () => import("vue-dynamic-marquee");

@Component({
  components: {
    DynamicMarquee,
  },
})
export default class BaseTicker extends Vue {}
</script>
