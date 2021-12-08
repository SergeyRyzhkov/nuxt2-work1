<template>
  <header>
    <div class="bg-primary container-fluid text-white py-12 text-sm flex">
      <div v-for="i of 10" :key="i" class="first:-ml-120 mr-120 flex-grow flex-shrink-0">
        Бесплатная доставка при заказе от 6 000 рублей
      </div>
    </div>
    <div class="container py-32">
      <div class="flex items-center">
        <HeaderLogo></HeaderLogo>
        <HeaderSearchInput class="mx-24 lg:mx-48"></HeaderSearchInput>
        <HeaderUser class="ml-auto flex-shrink-0"></HeaderUser>
      </div>
    </div>
    <div class="container-fluid bg-primary py-16">
      <HeaderMenu class="container"></HeaderMenu>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class TheHeader extends Vue {}
</script>
