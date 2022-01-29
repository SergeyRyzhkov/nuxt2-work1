<template>
  <section>
    <header class="relative z-50">
      <div class="container-fluid text-sm z-50 h-[37px] bg-primary">
        <!-- <LazyBaseTicker direction="row" :repeat="true" :repeat-margin="86" :speed="{ type: 'pps', number: 130 }">
          <span class="text-white text-12 uppercase w-max flex items-center justify-center p-8"
            >Бесплатная доставка при заказе от 6 000 рублей</span
          >
        </LazyBaseTicker> -->
      </div>
      <div class="bg-white">
        <div class="container flex items-center py-34">
          <HeaderLogo></HeaderLogo>
          <HeaderSearchInput class="mx-24 lg:mx-48"></HeaderSearchInput>
          <HeaderUser class="ml-auto flex-shrink-0"></HeaderUser>
        </div>
      </div>
      <div class="container-fluid relative bg-primary">
        <HeaderMenu class="container"></HeaderMenu>
      </div>
    </header>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
@Component
export default class TheHeader extends Vue {}
</script>
