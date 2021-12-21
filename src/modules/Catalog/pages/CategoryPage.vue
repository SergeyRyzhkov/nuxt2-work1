<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <h1>{{ h1Text }}</h1>
    <CategoryCatalog :categories="categories" class="w-1/4 mt-22"></CategoryCatalog>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Vue, Watch, Prop } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import CategoryModel from "../models/CategoryModel";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";
import { RouteLink } from "@/_core/models/RouteLink";

@Component
export default class CategoryPage extends Vue {
  @Prop()
  slug: string;

  model: CategoryModel | null = new CategoryModel();
  categories: CategoryModel[] = [];
  h1Text = "Каталог";

  head() {
    if (!!this.model?.meta_slug) {
      this.model.meta_image = this.model.logo?.url || this.model.banner?.url || undefined;
    }
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.model, this.$route.fullPath);
  }

  @Watch("slug", { immediate: true })
  async onSlugChanged() {
    this.model = !!this.slug ? await this.$serviceLocator.getService(CatalogService).getBySlug(this.slug) : null;
    this.loadCategories();
  }

  async loadCategories() {
    this.h1Text = !this.model || this.model?.subcategory?.length > 0 ? "Каталог" : this.model.title;

    const breadCrumbList: RouteLink[] = [];

    this.$serviceLocator.getService(CatalogService).buldBreadCrumb(breadCrumbList, this.model);
    breadCrumbList.push({ linkName: "Каталог", name: "catalog" }, { linkName: "Главная", name: "main" });
    breadCrumbList.reverse();
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);

    if (!!this.model) {
      this.categories = this.model.subcategory;
    } else {
      this.categories = await this.$serviceLocator.getService(CatalogService).getRoot();
    }
  }
}
</script>
