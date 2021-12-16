<template>
  <footer class="bg-primary container-fluid">
    <div class="container flex flex-wrap items-start pt-20 pb-10 lg:pt-40 lg:pb-20">
      <footer-logo class="w-1/4"></footer-logo>
      <footer-about class="ml-100"></footer-about>
      <footer-info class="ml-100"></footer-info>
      <footer-contacts class="ml-100 flex-shrink-0"></footer-contacts>
    </div>
    <div class="container-fluid border-b border-footer"></div>
    <FooterLast class="container flex lg:my-30"></FooterLast>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class TheFooter extends Vue {}
</script>

<style lang="scss">
.footer-ul {
  color: $footer-color;
  font-size: 14px;
  li:first-child {
    margin-bottom: 28px;
    color: white;
  }
  > li + li {
    cursor: pointer;
    margin-bottom: 13px;
  }
}
</style>
