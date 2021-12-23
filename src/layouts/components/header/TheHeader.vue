<template>
  <section>
    <div v-show="catalogMenuVisible" class="fixed min-h-screen h-screen w-full bg-strong-nude opacity-80 top-0 left-0 z-40"></div>

    <header class="z-50 relative">
      <div class="bg-primary container-fluid  text-sm z-50 h-[37px] ticker-component">
        <BaseTicker
        :direction="'row'"
        :repeat="true"
        :repeatMargin="86"
        :speed="{type: 'pps', number: 130}"
        >
          <div class="ticker">
            Бесплатная доставка при заказе от 6 000 рублей
          </div>
        </BaseTicker>
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
<style lang="scss">
.ticker-component{
  color: #ffffff;
  font-size: 12px;
  line-height: 14px;
  @apply uppercase;
  .ticker {
    @apply h-full flex items-center justify-center;
    width: 368px;
  }
}
</style>
