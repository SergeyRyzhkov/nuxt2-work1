<template>
  <div>
    <BaseStaticBanner image-src="/images/tmp_category.jpg" :is-container="true"></BaseStaticBanner>
    <section v-if="!!model" class="mt-40 md:mt-60">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-40 gap-x-30">
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
