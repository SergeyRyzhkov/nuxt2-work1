<template>
  <div v-show="!$fetchState.pending" class="catalog-top-menu" :class="[menuVisible ? 'active' : '']">
    <div class="container flex justify-between">
      <div class="catalog-top-menu__grid py-40 w-2/3">
        <div v-for="iter in list" :key="iter.id">
          <span class="catalog-top-menu__title" @click="goToCatalog(iter)">{{ iter.title }}</span>
        </div>
      </div>
      <div class="w-1/3 py-40">
        <img src="/images/catalog-menu-banner.jpg" />
      </div>
    </div>
    <div class="fixed min-h-screen h-screen w-full bg-primary opacity-30 top-0 left-0 z-[-1]"></div>
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

  async fetch() {
    this.list = await this.$serviceLocator.getService(CatalogService).getRoot();
  }

  goToCatalog(model: CategoryModel) {
    const loc = this.$serviceLocator.getService(CatalogService).createCategoryRouteLocation(model);
    if (this.$route.name !== loc.name) {
      this.$router.push(loc);
    }
  }
}
</script>

<style lang="scss">
.catalog-top-menu {
  left: 0;
  right: 0;
  background-color: white;
  top: 49px;
  visibility: hidden;
  height: 0px;
  max-height: 0px;
  position: absolute;
  transition: max-height 0.2s ease-in-out;
  &.active {
    visibility: visible;
    position: absolute;
    height: max-content;
    max-height: 40vh;
  }
  .catalog-top-menu__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 24px;
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
