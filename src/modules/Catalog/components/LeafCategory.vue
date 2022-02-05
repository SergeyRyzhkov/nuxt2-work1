<template>
  <div v-if="!!model">
    <BaseStaticBanner :image-src="bannerSrc" :is-container="true" default-image="/images/default-banner-black.jpg"
      ><h1 v-if="!bannerSrc" class="bottom-30 absolute left-60 text-white md:bottom-60" v-html="model.title"></h1
    ></BaseStaticBanner>
    <section v-if="!!model && !!productList" class="mt-40 md:mt-60">
      <div class="text-14 text-text-gray mb-28">{{ productCountText }}</div>
      <div class="grid grid-cols-2 gap-x-9 gap-y-40 md:grid-cols-2 lg:grid-cols-3">
        <ProductItem v-for="iter in productList" :key="iter.id" :model="iter"> </ProductItem>
        <InfiniteScroll @on-intersect="loadMoreProducts()">
          <template v-if="loading">
            <ProductItemSkeleton v-for="index in 6" :key="index"> </ProductItemSkeleton>
          </template>
        </InfiniteScroll>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import CategoryModel from "../models/CategoryModel";
import { CatalogService } from "../CatalogService";
import ProductModel from "../models/ProductModel";
import { decOfNum } from "@/utils/Formaters";
import { Pagination } from "@/_core/models/Pagination";

@Component
export default class LeafCategory extends Vue {
  @Prop()
  model: CategoryModel;

  pagination: Pagination = new Pagination();
  loading = true;
  productList: ProductModel[] = [];

  async fetch() {
    await this.loadMoreProducts();
  }

  async loadMoreProducts() {
    if (Pagination.hasNextPage(this.pagination)) {
      this.loading = true;
      Pagination.nextPage(this.pagination);
      const result = await this.$serviceLocator.getService(CatalogService).getProductsByCategory(this.pagination, this.model);
      this.pagination.total = result.pagination.total;
      this.productList = [...this.productList, ...result.data];
      this.loading = false;
    }
  }

  get bannerSrc() {
    return this.model?.banner?.url;
  }

  get productCountText() {
    return `Найдено: ${this.pagination.total} ${decOfNum(this.pagination.total, ["товар", "товара", "товаров"])}`;
  }
}
</script>
