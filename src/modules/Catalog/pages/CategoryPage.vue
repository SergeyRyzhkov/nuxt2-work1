<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <div v-if="!$fetchState.pending" class="flex">
      <div class="w-1/4">
        <h1>{{ h1Text }}</h1>
        <CategoryCatalog :categories="categories" class="mt-22"></CategoryCatalog>
      </div>
      <div class="w-3/4 ml-40">
        <RootCategory v-show="isRootCategory"></RootCategory>
        <CategoryContent v-show="isNotLeafCategory"></CategoryContent>
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
  categories: CategoryModel[] = [];
  h1Text = "";

  get isRootCategory() {
    return !this.slug && !this.model?.id;
  }

  get isNotLeafCategory() {
    return !!this.model?.subcategory?.length;
  }

  get isLeafCategory() {
    return !!this.model?.id && !this.model?.subcategory?.length;
  }

  async fetch() {
    let slug = this.slug;
    if (!this.slug) {
      const tryGetSlug = this.$route.path.split("/");
      slug = (!!tryGetSlug && !!tryGetSlug.length && tryGetSlug[tryGetSlug.length - 1]) || this.slug;
    }
    this.model = !!slug && slug !== "catalog" ? await this.$serviceLocator.getService(CatalogService).getBySlug(slug) : null;

    this.h1Text = !this.model ? "Каталог" : this.model.title;

    getModule(AppStore, this.$store).updateBreadCrumbList(
      this.$serviceLocator.getService(CatalogService).buildBreadCrumb(this.model)
    );

    if (!!this.model && !!this.model.id) {
      this.categories = this.model.subcategory;
    } else {
      this.categories = await this.$serviceLocator.getService(CatalogService).getRoot();
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
