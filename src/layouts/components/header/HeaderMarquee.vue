<template>
  <div class="marquee">
    <span :class="textClass">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class HeaderMarquee extends Vue {
  @Prop()
  text: string;

  @Prop()
  textClass: string;
}
</script>

<style lang="scss">
.marquee {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}

.marquee span {
  display: inline-block;
  padding-left: 100%;
  -webkit-animation: marquee 10s infinite linear;
  animation: marquee 15s infinite linear;
}

@-webkit-keyframes marquee {
  0% {
    -webkit-transform: translate(0, 0);
  }
  100% {
    -webkit-transform: translate(-100%, 0);
  }
}
@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
</style>
