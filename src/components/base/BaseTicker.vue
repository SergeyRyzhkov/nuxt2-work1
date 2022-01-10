<template>
  <client-only>
    <div>
      <!-- <dynamic-marquee v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </dynamic-marquee> -->
    </div>
  </client-only>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
// const DynamicMarquee = () => import("vue-dynamic-marquee");

// @Component({
//   components: {
//     DynamicMarquee,
//   },
// })
@Component
export default class BaseTicker extends Vue {}
</script>
