<template>
  <div>
    <RootCategory v-show="isRootCategory"></RootCategory>
    <div v-if="isNotLeafCategory">
      <section>
        <LazyBaseSwiper :slides="subCategories" :settings="sliderSettings">
          <template #slide="{ slide }">
            <nuxt-link class="w-226 flex flex-col" :to="getSubCategoryRoute(slide)">
              <img
                v-lazysrc="getSubCategoryLogo(slide)"
                height="226"
                width="226"
                alt=" "
                class="h-226 w-226 object-scale-down transition-all hover:scale-105"
              />
              <span class="mt-16">{{ slide.title }}</span>
              <span class="text-12 text-text-gray mt-6">{{ slide.subtitle }}</span>
            </nuxt-link>
          </template>
        </LazyBaseSwiper>
      </section>

      <section v-if="!!sliders && sliders.length" class="md:mt-50 mt-32">
        <LazyBaseSwiper :slides="sliders" :settings="{ slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 0 }">
          <template #slide="{ slide }">
            <div class="flex w-full flex-col">
              <img v-lazysrc="slide.url" height="400" width="400" alt=" " class="h-400 w-full object-cover" />
            </div>
          </template>
        </LazyBaseSwiper>
      </section>

      <section v-if="!!model" class="mt-40 md:mt-60">
        <div class="text-14 text-text-gray mb-28">{{ productCountText }}</div>
        <div class="gap-x-30 grid grid-cols-1 gap-y-40 md:grid-cols-2 lg:grid-cols-3">
          <ProductItem v-for="iter in productList" :key="iter.id" :model="iter"> </ProductItem>
          <InfiniteScroll @on-intersect="loadMoreProducts()">
            <template v-if="loading">
              <ProductItemSkeleton v-for="index in 6" :key="index"> </ProductItemSkeleton>
            </template>
          </InfiniteScroll>
        </div>
      </section>
    </div>

    <LeafCategory v-if="isLeafCategory" :model="model"></LeafCategory>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import CategoryModel from "../models/CategoryModel";
import ProductModel from "../models/ProductModel";
import { decOfNum } from "@/utils/Formaters";
import { Pagination } from "@/_core/models/Pagination";

@Component
export default class CategoryContent extends Vue {
  @Prop()
  model: CategoryModel;

  @Prop()
  slug: string;

  pagination: Pagination = new Pagination();
  loading = true;
  productList: ProductModel[] = [];

  @Watch("isNotLeafCategory")
  async onNotLeaf(val) {
    if (!!val) {
      await this.loadMoreProducts();
    }
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
    return `Найдено: ${this.pagination.total} ${decOfNum(this.pagination.total, ["товар", "товара", "товаров"])}`;
  }

  get sliders() {
    return this.model?.slider;
  }

  get subCategories() {
    return this.model?.subcategory || [];
  }

  getSubCategoryLogo(cat: CategoryModel) {
    return cat?.logo ? cat.logo.url : "/images/product-no-photo.jpg";
  }

  getSubCategoryRoute(cat: CategoryModel) {
    return this.$serviceLocator.getService(CatalogService).getRouteLocation(cat);
  }

  get sliderSettings() {
    return {
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 30,
          slidesPerGroup: 1,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 40,
        },
      },
    };
  }
}
</script>
