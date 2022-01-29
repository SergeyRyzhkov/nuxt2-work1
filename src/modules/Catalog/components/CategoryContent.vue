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
                class="w-226 h-226 object-cover object-top transition-all hover:scale-105"
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
              <img v-lazysrc="slide.url" height="400" width="400" alt=" " class="h-400 w-full object-cover object-top" />
            </div>
          </template>
        </LazyBaseSwiper>
      </section>

      <section v-if="!!model && !!model.products" class="mt-40 md:mt-60">
        <div class="text-14 text-text-gray mb-28">{{ productCountText }}</div>
        <div class="gap-x-30 grid grid-cols-1 gap-y-40 md:grid-cols-2 lg:grid-cols-3">
          <ProductItem v-for="iter in model.products" :key="iter.id" :model="iter"> </ProductItem>
        </div>
      </section>
    </div>

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
    return this.$serviceLocator.getService(CatalogService).productCountText(this.model);
  }

  get products() {
    return this.$serviceLocator.getService(CatalogService).getAllProducts(this.model);
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
          slidesPerView: 2,
          spaceBetween: 16,
          slidesPerGroup: 2,
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
