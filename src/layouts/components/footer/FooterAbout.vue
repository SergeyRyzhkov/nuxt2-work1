<template>
  <div class="footer-menu-list">
    <div class="footer-title flex items-center justify-between" @click="openList">О КОМПАНИИ
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="lg:hidden" :class="{show}">
        <rect width="17.5226" height="1.75226" rx="0.87613"
              transform="matrix(-0.00859092 0.999963 -0.999963 0.00859092 11.7793 2.14966)" fill="white"/>
        <rect width="17.5226" height="1.75226" rx="0.87613"
              transform="matrix(0.999963 -0.00859046 -0.00859046 0.999963 2.41895 10.2809)" fill="white"/>
      </svg>
    </div>
    <ul class="footer-ul" :class="{show}">
      <li>
        <nuxt-link :to="{ name: 'about' }">О нас</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{ name: 'news' }">Новости</nuxt-link>
      </li>
      <li>Договор-оферта</li>
      <li>Реквизиты</li>
      <li>Пользовательское <br/>соглашение</li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component
export default class FooterAbout extends Vue {
  show: boolean = false;

  openList() {
    this.show = !this.show
  }
}
</script>
