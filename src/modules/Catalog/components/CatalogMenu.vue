<template>
  <div v-show="!$fetchState.pending" class="catalog-top-menu" :class="[menuVisible ? 'active' : '']">
    <div class="container flex justify-between">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-24 gap-x-24 py-40 w-2/3">
        <div v-for="iter in list" :key="iter.id" @mouseover="categoryOver(iter)">
          <span class="catalog-top-menu__title" @click="goToCatalog(iter)">{{ iter.title }}</span>
        </div>
      </div>
      <div class="w-1/3 py-40">
        <img v-lozad="banerSrc" alt=" " width="400" height="240" class="w-400 h-240 object-cover object-left-top" />
      </div>
    </div>
    <div
      class="fixed min-h-screen h-screen w-full bg-primary opacity-30 top-0 left-0 z-[-1]"
      :class="[!menuVisible ? 'hidden' : 'block']"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import CategoryModel from "../models/CategoryModel";

@Component
export default class CatalogMenu extends Vue {
  @Prop({ default: false })
  menuVisible: boolean;

  list: CategoryModel[] = [];
  banerSrc = "/images/catalog-menu-banner.jpg";

  async fetch() {
    this.list = await this.$serviceLocator.getService(CatalogService).getRoot();
  }

  goToCatalog(model: CategoryModel) {
    const loc = this.$serviceLocator.getService(CatalogService).createCategoryRouteLocation(model);
    if (this.$route.name !== loc.name) {
      this.$router.push(loc);
    }
  }

  categoryOver(model: CategoryModel) {
    this.banerSrc = model.banner_menu?.url || "/images/catalog-menu-banner.jpg";
  }
}
</script>

<style lang="scss">
.catalog-top-menu {
  left: 0;
  right: 0;
  background-color: white;
  top: 49px;
  max-height: 0px;
  position: absolute;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  &.active {
    position: absolute;
    height: max-content;
    max-height: 40vh;
  }
  .catalog-top-menu__title {
    font-size: 14px;
    font-weight: 500;
    color: $primary;
    cursor: pointer;
    &:hover {
      color: $secondary;
    }
  }
}
</style>
