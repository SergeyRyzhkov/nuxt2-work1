<template>
  <div>
    <BaseStaticBanner image-src="/images/tmp_category.jpg" :is-container="true"></BaseStaticBanner>
    <section v-if="!!model" class="mt-40 md:mt-60">
      <div class="products-list-wrapper">
        <ProductItem v-for="iter in model.products" :key="iter.id" :model="iter"> </ProductItem>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import CategoryModel from "../models/CategoryModel";

@Component
export default class LeafCategory extends Vue {
  @Prop()
  model: CategoryModel;
}
</script>

<style lang="scss">
.products-list-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 300px));
  row-gap: 60px;
  column-gap: 30px;
}
</style>
