<template>
  <div class="flex w-full flex-col items-center lg:w-auto lg:items-start">
    <div class="footer-menu-list">
      <div class="footer-title flex items-center justify-between" @click="openList">
        КОНТАКТЫ
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="lg:hidden"
          :class="{ show }"
        >
          <rect
            width="17.5226"
            height="1.75226"
            rx="0.87613"
            transform="matrix(-0.00859092 0.999963 -0.999963 0.00859092 11.7793 2.14966)"
            fill="white"
          />
          <rect
            width="17.5226"
            height="1.75226"
            rx="0.87613"
            transform="matrix(0.999963 -0.00859046 -0.00859046 0.999963 2.41895 10.2809)"
            fill="white"
          />
        </svg>
      </div>
      <ul class="footer-ul" :class="{ show }">
        <li>{{ phone }}</li>
        <li>{{ email }}</li>
        <li>{{ address }}</li>
      </ul>
    </div>
    <FooterSocials class="pb-22 pt-32 lg:mt-20 lg:py-0" />
    <div class="mb-24 flex items-center lg:mb-0 lg:mt-40">
      <a v-if="googlePlay" :href="googlePlay" target="_blank">
        <img v-lazysrc="'/images/app_store.svg'" alt=" " width="140" height="42" />
      </a>
      <a v-if="appStore" :href="appStore" target="_blank">
        <img v-lazysrc="'/images/google_play.svg'" class="ml-14" alt=" " width="140" height="42" />
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { SettingService } from "@/modules/Root/SettingService";
import AppSettings from "@/modules/Root/models/AppSettings";
import { formatPhoneNumber } from "@/utils/Formaters";

@Component
export default class FooterContacts extends Vue {
  show: boolean = false;
  settings: AppSettings = new AppSettings();

  async fetch() {
    this.settings = await this.$serviceLocator.getService(SettingService).getAppSetting();
  }

  get phone() {
    return formatPhoneNumber(this.settings.phone);
  }

  get address() {
    return this.settings.address;
  }

  get email() {
    return this.settings.email;
  }

  get googlePlay() {
    return this.settings.google_play;
  }

  get appStore() {
    return this.settings.app_store;
  }

  openList() {
    this.show = !this.show;
  }
}
</script>
