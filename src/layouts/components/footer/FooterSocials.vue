<template>
  <section class="flex items-center social-items">
    <a
      v-for="(item, i) in socials"
      :key="i"
      :href="item.url"
      target="_blank"
      class="social-item flex items-center justify-center"
    >
      <figure>
        <img v-lozad="item.icon" />
      </figure>
    </a>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class FooterSocials extends Vue {
  socials = [
    { icon: "/icons/social/vk.svg", url: "" },
    { icon: "/icons/social/facebook.svg", url: "" },
    { icon: "/icons/social/ok.svg", url: "" },
    { icon: "/icons/social/youtube.svg", url: "" },
    { icon: "/icons/social/instagram.svg", url: "" },
  ];
}
</script>

<style lang="scss">
.social-items {
  .social-item + .social-item {
    margin-left: 13px;
  }
}
.social-item {
  width: 37px;
  height: 37px;
  border: 1px solid #575555;
  border-radius: 100px;
  > figure {
    > img {
      height: 15px;
      width: 15px;
    }
  }
}
</style>
