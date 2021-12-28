<template>
  <footer class="bg-primary container-fluid">
    <div class="container flex items-start justify-between pt-20 pb-10 lg:pt-40 lg:pb-20">
      <div class="w-auto flex flex-col min-w-[206px] xl:min-w-[306px]">
        <footer-logo></footer-logo>
        <footer-subscribe class="mt-45"/>
      </div>
      <div class="w-full flex justify-end">
        <div class="flex items-start justify-between xl:w-11/12 xl:w-10/12">
          <footer-about></footer-about>
          <footer-info class="ml-20"></footer-info>
          <footer-contacts class="ml-20 flex-shrink-0"></footer-contacts>
        </div>
      </div>
    </div>
    <div class="container-fluid border-b border-footer-color"></div>
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
