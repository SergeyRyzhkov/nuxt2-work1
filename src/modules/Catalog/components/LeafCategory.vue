<template>
  <div>
    <BaseStaticBanner :image-src="bannerSrc" :is-container="true" default-image="/images/default-banner-black.jpg"
      ><h1 v-if="!bannerSrc" class="bottom-30 absolute left-60 text-white md:bottom-60" v-html="model.title"></h1
    ></BaseStaticBanner>
    <section v-if="!!model && !!model.products" class="mt-40 md:mt-60">
      <div class="text-14 text-text-gray mb-28">{{ productCountText }}</div>
      <div class="grid grid-cols-2 gap-x-9 gap-y-40 md:grid-cols-2 lg:grid-cols-3">
        <ProductItem v-for="iter in model.products" :key="iter.id" :model="iter"> </ProductItem>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import CategoryModel from "../models/CategoryModel";
import { CatalogService } from "../CatalogService";

@Component
export default class LeafCategory extends Vue {
  @Prop()
  model: CategoryModel;

  get bannerSrc() {
    return this.model?.banner?.url;
  }

  get productCountText() {
    return this.$serviceLocator.getService(CatalogService).productCountText(this.model);
  }
}
</script>
