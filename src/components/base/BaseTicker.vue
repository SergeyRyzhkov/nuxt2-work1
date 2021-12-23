<template>
  <section class="w-full h-full py-11">
    <client-only>
      <dynamic-marquee :direction="direction" :repeat="repeat" :repeatMargin="repeatMargin" :speed="speed" class="ticker">
        <slot></slot>
      </dynamic-marquee>
    </client-only>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import DynamicMarquee from 'vue-dynamic-marquee';

@Component({
  components: {
    DynamicMarquee
  },
})
export default class BaseTicker extends Vue {
  @Prop()
  direction: string;

  @Prop()
  repeat: boolean;

  @Prop()
  repeatMargin: string;

  @Prop()
  speed: string;
}
</script>
