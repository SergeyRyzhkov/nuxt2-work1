<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <div v-if="!$fetchState.pending" class="flex">
      <div class="w-1/4">
        <h1>{{ h1Text }}</h1>
        <CategoryCatalog v-show="!isLeafCategory" class="mt-22" @category-clicked="onCategoryClicked"></CategoryCatalog>
        <div v-show="isLeafCategory && !!parentCategoryName" class="flex flex-col mt-32">
          <span>Категория</span>
          <button type="button" class="flex items-center mt-20" @click.stop="goBack">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.99316 9.9873L1.98621 5.98035L5.99316 1.97339"
                stroke="#16192C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <div class="text-14 ml-6">{{ parentCategoryName }}</div>
          </button>
        </div>
      </div>
      <div class="w-3/4 ml-40">
        <RootCategory v-show="isRootCategory" :model="model"></RootCategory>
        <CategoryContent v-show="isNotLeafCategory" :model="model"></CategoryContent>
        <LeafCategory v-show="isLeafCategory" :model="model"></LeafCategory>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Vue, Prop } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import CategoryModel from "../models/CategoryModel";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";

@Component
export default class CategoryPage extends Vue {
  @Prop()
  slug: string;

  model: CategoryModel | null = new CategoryModel();
  h1Text: any = "";

  get isRootCategory() {
    return !this.slug && !this.model?.id;
  }

  get isNotLeafCategory() {
    return !!this.model?.subcategory?.length;
  }

  get isLeafCategory() {
    return !!this.model?.id && !this.model?.subcategory?.length;
  }

  get parentCategoryName() {
    return this.model?.parent?.title;
  }

  async fetch() {
    let slug = this.slug;
    if (!this.slug) {
      const tryGetSlug = this.$route.path.split("/");
      slug = (!!tryGetSlug && !!tryGetSlug.length && tryGetSlug[tryGetSlug.length - 1]) || this.slug;
    }

    this.model = !!slug && slug !== "catalog" ? await this.$serviceLocator.getService(CatalogService).getBySlug(slug) : null;

    this.h1Text = this.isLeafCategory ? this.model?.title : "Каталог";

    getModule(AppStore, this.$store).updateBreadCrumbList(
      this.$serviceLocator.getService(CatalogService).buildBreadCrumb(this.model)
    );
  }

  onCategoryClicked(model: CategoryModel) {
    this.model = model;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  goBack() {
    if (this.model?.parent) {
      const parms = this.$serviceLocator.getService(CatalogService).createCategoryRouteLocation(this.model.parent);
      this.$router.push(parms);
    }
  }

  head() {
    if (!!this.model?.meta_slug) {
      this.model.meta_image = this.model.logo?.url || this.model.banner?.url || undefined;
    }
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.model, this.$route.fullPath);
  }
}
</script>
