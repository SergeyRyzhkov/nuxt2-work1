<template>
  <div>
    <RootCategory v-show="isRootCategory"></RootCategory>

    <div v-if="isNotLeafCategory">
      <section>
        <LazyHydrate when-visible>
          <LazyBaseSwiper :slides="subCategories" :settings="sliderSettings">
            <template #slide="{ slide }">
              <nuxt-link class="flex flex-col w-226" :to="getSubCategoryRoute(slide)">
                <img
                  v-lazyimg="getSubCategoryLogo(slide)"
                  height="226"
                  width="226"
                  alt=" "
                  class="w-226 h-226 object-cover object-top hover:scale-105 transition-all"
                />
                <span class="mt-16">{{ slide.title }}</span>
                <span class="mt-6 text-12 text-text-gray">{{ slide.subtitle }}</span>
              </nuxt-link>
            </template>
          </LazyBaseSwiper>
        </LazyHydrate>
      </section>

      <section v-if="!!sliders && sliders.length" class="mt-32 md:mt-50">
        <LazyHydrate when-visible>
          <LazyBaseSwiper :slides="sliders" :settings="{ slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 0 }">
            <template #slide="{ slide }">
              <div class="flex flex-col w-full">
                <img v-lazyimg="slide.url" height="400" width="400" alt=" " class="w-full h-400 object-cover object-top" />
              </div>
            </template>
          </LazyBaseSwiper>
        </LazyHydrate>
      </section>

      <section v-if="!!model && !!model.products" class="mt-40 md:mt-60">
        <div class="text-14 text-text-gray mb-28">{{ productCountText }}</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-40 gap-x-30">
          <ProductItem v-for="iter in model.products" :key="iter.id" :model="iter"> </ProductItem>
        </div>
      </section>
    </div>

    <LeafCategory v-show="isLeafCategory" :model="model"></LeafCategory>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import LazyHydrate from "vue-lazy-hydration";
import { CatalogService } from "../CatalogService";
import CategoryModel from "../models/CategoryModel";

@Component({
  components: {
    LazyHydrate,
  },
})
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
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 40,
        },
      },
    };
  }
}
</script>
