<template>
  <section>
    <header class="relative z-50">
      <div class="container-fluid bg-primary z-50 flex h-[37px] text-sm">
        <HeaderMarquee
          class="my-auto"
          :text="marqueeText"
          text-class="text-12 uppercase font-semibold text-white"
        ></HeaderMarquee>
      </div>
      <div class="bg-white">
        <div class="py-34 container flex items-center">
          <HeaderLogo></HeaderLogo>
          <HeaderSearchInput class="mx-24 lg:mx-48"></HeaderSearchInput>
          <HeaderUser class="ml-auto flex-shrink-0"></HeaderUser>
        </div>
      </div>
      <div class="container-fluid bg-primary relative">
        <HeaderMenu class="container"></HeaderMenu>
      </div>
    </header>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppSettings from "@/modules/Root/models/AppSettings";
import { SettingService } from "@/modules/Root/SettingService";
@Component
export default class TheHeader extends Vue {
  settings: AppSettings = new AppSettings();

  async fetch() {
    this.settings = await this.$serviceLocator.getService(SettingService).getAppSetting();
  }

  get marqueeText() {
    return this.settings.running_line;
  }
}
</script>
