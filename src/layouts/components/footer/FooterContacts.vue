<template>
  <div class="lg:w-auto w-full flex flex-col lg:items-start items-center">
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
        <li>+7(495)740-07-00</li>
        <li>info@kaypro.ru</li>
        <li>Москва, Остаповский проезд, 5, стр. 1, оф. 801</li>
      </ul>
    </div>
    <FooterSocials class="lg:mt-20 lg:py-0 pt-32 pb-22" />
    <div class="flex items-center mb-24 lg:mb-0 lg:mt-40">
      <a href="" target="_blank">
        <img src="/images/app_store.svg" alt=" " width="140" height="42" />
      </a>
      <a href="" target="_blank">
        <img class="ml-14" src="/images/google_play.svg" alt=" " width="140" height="42" />
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class FooterContacts extends Vue {
  show: boolean = false;

  openList() {
    this.show = !this.show;
  }
}
</script>
