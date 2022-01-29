<template>
  <section class="flex items-center">
    <a
      v-for="(item, i) in socials"
      :key="i"
      :href="item.url"
      target="_blank"
      class="ml-12 flex h-37 w-37 items-center justify-center rounded-full border border-solid border-footer-color first:ml-0"
    >
      <img v-lazysrc="item.icon" alt=" " width="16" height="16" class="h-16 w-16" />
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
