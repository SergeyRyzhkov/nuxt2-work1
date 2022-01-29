<template>
  <div class="footer-bottom flex flex-col-reverse items-center justify-between md:flex-row">
    <div class="footer-bottom-text mt-18 md:mt-0" @click="clearCache()">© {{ new Date().getFullYear() }} kaypro.ru</div>
    <FooterPayments />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import MemoryCache from "@/_core/MemoryCache";

@Component
export default class FooterLast extends Vue {
  clearCache() {
    MemoryCache.clear();
  }
}
</script>

<style lang="scss">
.footer-bottom {
  &-text {
    color: $footer-color;
    font-size: 14px;
    line-height: 24px;
  }
}
</style>
