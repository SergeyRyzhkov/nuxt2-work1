<template>
  <section class="flex items-center">
    <a
      v-for="(item, i) in socials"
      :key="i"
      :href="item.url"
      target="_blank"
      class="w-37 h-37 flex items-center justify-center first:ml-0 ml-12 rounded-full border border-footer-color border-solid"
    >
      <img v-lazyimg="item.icon" alt=" " width="16" height="16" class="w-16 h-16" />
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
