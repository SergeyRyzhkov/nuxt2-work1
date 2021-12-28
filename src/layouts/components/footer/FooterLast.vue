<template>
  <div class="footer-bottom flex flex-col-reverse md:flex-row items-center justify-between">
    <div class="footer-bottom-text mt-18 md:mt-0">© {{ new Date().getFullYear() }} kaypro.ru</div>
    <FooterPayments />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class FooterLast extends Vue {}
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
