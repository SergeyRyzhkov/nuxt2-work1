<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <div class="flex">
      <div class="w-1/4">
        <h1 class="mb-22">{{ h1Text }}</h1>
        <CatalogNavigator class="mt-22" @category-clicked="onCategoryClicked"></CatalogNavigator>
      </div>
      <div class="w-3/4 ml-40">
        <nuxt-child :model="selectedModel"></nuxt-child>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Vue, Watch } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import CategoryModel from "../models/CategoryModel";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";

@Component
export default class CatalogPage extends Vue {
  selectedModel: CategoryModel = new CategoryModel();

  get h1Text() {
    return !!this.selectedModel?.id && !this.selectedModel?.subcategory?.length ? this.selectedModel?.title : "Каталог";
  }

  @Watch("$route.path")
  async onRoutePathChanged() {
    const lastSlug = this.lastRoutePathPart;

    this.selectedModel =
      !!lastSlug && lastSlug !== "catalog"
        ? await this.$serviceLocator.getService(CatalogService).getBySlug(lastSlug)
        : new CategoryModel();
    this.updateBreadCrumbs(this.selectedModel);
  }

  async onCategoryClicked(model: CategoryModel) {
    this.updateBreadCrumbs(model);

    this.selectedModel = await this.$serviceLocator.getService(CatalogService).getBySlug(model.meta_slug);

    const parms = this.$serviceLocator.getService(CatalogService).getRouteLocation(this.selectedModel);
    if (parms.name !== this.$route.name) {
      this.$router.push(parms);
    }
  }

  updateBreadCrumbs(model: CategoryModel) {
    getModule(AppStore, this.$store).updateBreadCrumbList(this.$serviceLocator.getService(CatalogService).buildBreadCrumb(model));
  }

  get lastRoutePathPart() {
    const slugs = this.$route?.path?.split("/");
    return !!slugs && !!slugs.length ? slugs[slugs.length - 1] : null;
  }

  head() {
    if (!!this.selectedModel?.meta_slug) {
      this.selectedModel.meta_image = this.selectedModel.logo?.url || undefined;
    }
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.selectedModel, this.$route.fullPath);
  }
}
</script>
