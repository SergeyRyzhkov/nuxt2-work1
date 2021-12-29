<template>
  <div v-if="!!model">
    {{ model }}
    <RootCategory v-show="isRootCategory"></RootCategory>
    <LeafCategory v-show="isLeafCategory" :model="model"></LeafCategory>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import CategoryModel from "../models/CategoryModel";

@Component
export default class CategoryContent extends Vue {
  @Prop()
  model: CategoryModel;

  @Prop()
  slug: string;

  get isRootCategory() {
    return !this.slug && !this.model?.id;
  }

  get isNotLeafCategory() {
    return !!this.model?.subcategory?.length;
  }

  get isLeafCategory() {
    return !!this.model?.id && !this.model?.subcategory?.length;
  }

  get productCountText() {
    return `Найдено ${this.products.length || 0} товаров`;
  }

  get products() {
    return this.$serviceLocator.getService(CatalogService).getAllProducts(this.model);
  }
}
</script>
