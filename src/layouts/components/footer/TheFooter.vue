<template>
  <footer class="bg-primary container-fluid">
    <div class="container flex flex-col lg:flex-row items-start justify-between pt-20 pb-10 lg:pt-40 lg:pb-20">
      <div class="lg:w-auto flex flex-col w-full lg:min-w-[206px] xl:min-w-[306px]">
        <footer-logo></footer-logo>
        <footer-subscribe class="mt-22 lg:mt-45" />
      </div>
      <div class="w-full flex lg:justify-end">
        <div class="flex w-full flex-col lg:flex-row lg:w-11/12 items-start justify-between md:w-11/12 xl:w-10/12 mt-40 lg:mt-0">
          <footer-about></footer-about>
          <footer-info class="lg:ml-20"></footer-info>
          <footer-contacts class="lg:ml-20 flex-shrink-0"></footer-contacts>
        </div>
      </div>
    </div>
    <div class="container-fluid border-b border-footer-color mt-0 md:mt-82"></div>
    <FooterLast class="container flex py-18 md:pt-22 md:pb-26"></FooterLast>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class TheFooter extends Vue {}
</script>

<style lang="scss">
.footer-title {
  @include widescreen {
    margin-bottom: 28px;
    padding: 0;
    width: auto;
  }
  svg {
    cursor: pointer;
  }
  svg.show {
    > rect:first-child {
      display: none;
    }
  }
  width: 100%;
  padding: 14px 0;
  color: white;
}
.footer-menu-list {
  border-bottom: 1px solid #575555;
  @include widescreen {
    border-bottom: none;
    width: auto;
  }
  width: 100%;
}
.footer-ul {
  color: $footer-color;
  font-size: 14px;
  max-height: 0;
  overflow: hidden;
  transition: 0.3s;
  @include widescreen {
    max-height: none !important;
    padding-bottom: 0;
  }
  &.show {
    max-height: 300px;
    padding-bottom: 24px;
  }
  > li + li {
    cursor: pointer;
    margin-top: 13px;
  }
}
</style>
