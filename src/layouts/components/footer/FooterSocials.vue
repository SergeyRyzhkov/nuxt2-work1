<template>
  <section class="flex items-center">
    <a
      v-for="(item, i) in socials"
      :key="i"
      :href="item.url"
      target="_blank"
      class="h-37 w-37 border-footer-color ml-12 flex items-center justify-center rounded-full border border-solid first:ml-0"
    >
      <img v-lazysrc="item.icon" alt=" " width="16" height="16" class="h-16 w-16" />
    </a>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppSettings from "@/modules/Root/models/AppSettings";
import { SettingService } from "@/modules/Root/SettingService";

@Component
export default class FooterSocials extends Vue {
  settings: AppSettings = new AppSettings();

  async fetch() {
    this.settings = await this.$serviceLocator.getService(SettingService).getAppSetting();
    this.initSocials();
  }

  socials: { icon: string; url: string }[] = [];

  initSocials() {
    if (this.settings.socials?.fb) {
      this.socials.push({ icon: "/icons/social/facebook.svg", url: this.settings.socials?.fb });
    }
    if (this.settings.socials?.vk) {
      this.socials.push({ icon: "/icons/social/vk.svg", url: this.settings.socials?.vk });
    }
    if (this.settings.socials?.youtube) {
      this.socials.push({ icon: "/icons/social/youtube.svg", url: this.settings.socials?.youtube });
    }
    if (this.settings.socials?.instagram) {
      this.socials.push({ icon: "/icons/social/instagram.svg", url: this.settings.socials?.instagram });
    }
    // if (this.settings.socials?.fb) {
    //   this.socials.push({ icon: "/icons/social/facebook.svg", url: this.settings.socials?.fb });
    // }
  }
}
</script>
