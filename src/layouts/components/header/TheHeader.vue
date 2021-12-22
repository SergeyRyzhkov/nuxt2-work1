<template>
  <section>
    <div v-show="catalogMenuVisible" class="fixed min-h-screen h-screen w-full bg-strong-nude opacity-80 top-0 left-0 z-40"></div>

    <header class="z-50 relative">
      <div class="bg-primary container-fluid text-white py-11 text-sm flex z-50">
        <div v-for="i of 10" :key="i" class="first:-ml-120 mr-120 flex-grow flex-shrink-0 text-12 leading-14">
          Бесплатная доставка при заказе от 6 000 рублей
        </div>
      </div>
      <div class="bg-white">
        <div class="container py-34 flex items-center">
          <HeaderLogo></HeaderLogo>
          <HeaderSearchInput class="mx-24 lg:mx-48"></HeaderSearchInput>
          <HeaderUser class="ml-auto flex-shrink-0"></HeaderUser>
        </div>
      </div>
      <div class="container-fluid bg-primary relative">
        <HeaderMenu
          class="container"
          @toogleCatalogMenu="toogleCatalogMenu()"
          @closeCatalogMenu="closeCatalogMenu()"
        ></HeaderMenu>
        <CatalogMenu :menu-visible="catalogMenuVisible"></CatalogMenu>
      </div>
    </header>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class TheHeader extends Vue {
  catalogMenuVisible = false;

  toogleCatalogMenu() {
    this.catalogMenuVisible = !this.catalogMenuVisible;
  }

  closeCatalogMenu() {
    this.catalogMenuVisible = false;
  }
}
</script>
