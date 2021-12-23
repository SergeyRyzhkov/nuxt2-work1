<template>
  <section>
    <div v-show="catalogMenuVisible" class="fixed min-h-screen h-screen w-full bg-strong-nude opacity-80 top-0 left-0 z-40"></div>

    <header class="z-50 relative">
      <div class="bg-primary container-fluid text-sm z-50 h-[37px]">
        <LazyBaseTicker direction="row" :repeat="true" :repeat-margin="86" :speed="{ type: 'pps', number: 130 }">
          <span class="text-white text-12 uppercase w-max flex items-center justify-center p-8"
            >Бесплатная доставка при заказе от 6 000 рублей</span
          >
        </LazyBaseTicker>
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
