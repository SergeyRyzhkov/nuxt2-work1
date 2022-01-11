<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <div class="flex">
      <div class="w-1/4">
        <div v-if="!isLeafCategory">
          <h1 class="mb-22">{{ h1Text }}</h1>
          <CatalogNavigator class="mt-22" @category-clicked="onCategoryClicked"></CatalogNavigator>
        </div>
        <div v-if="isLeafCategory" class="flex flex-col">
          <h1 class="mb-28">{{ selectedModel.title }}</h1>
          <div v-if="!!selectedModel.parent">
            <div class="font-semibold mb-16 text-18">Категория</div>
            <nuxt-link :to="parentCategoryRoute" class="flex items-center">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.99316 9.9873L1.98621 5.98035L5.99316 1.97339"
                  stroke="#16192C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>
              </svg>
              <span class="ml-4 text-14">
                {{ parentCategoryName }}
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="w-3/4 ml-40">
        <nuxt-child keep-alive :model="selectedModel"></nuxt-child>
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

  async fetch() {
    await this.updateData();
  }

  @Watch("$route.path")
  async onRoutePathChanged() {
    await this.updateData();
  }

  get h1Text() {
    return !!this.selectedModel?.id && !this.selectedModel?.subcategory?.length ? this.selectedModel?.title : "Каталог";
  }

  get isLeafCategory() {
    return !!this.selectedModel?.id && !this.selectedModel?.subcategory?.length;
  }

  get parentCategoryName() {
    return this.selectedModel?.parent?.title;
  }

  get parentCategoryRoute() {
    return this.$serviceLocator.getService(CatalogService).getRouteLocation(this.selectedModel?.parent);
  }

  async updateData() {
    const lastSlug = this.$route.path.split("/")[this.$route.path.split("/").length - 1];

    this.selectedModel =
      !!lastSlug && lastSlug !== "catalog"
        ? await this.$serviceLocator.getService(CatalogService).getBySlug(lastSlug)
        : new CategoryModel();

    this.updateBreadCrumbs(this.selectedModel);
  }

  onCategoryClicked(model: CategoryModel) {
    const parms = this.$serviceLocator.getService(CatalogService).getRouteLocation(model);
    if (parms.name !== this.$route.name) {
      this.$router.push(parms);
    }
  }

  updateBreadCrumbs(model: CategoryModel) {
    getModule(AppStore, this.$store).updateBreadCrumbList(this.$serviceLocator.getService(CatalogService).buildBreadCrumb(model));
  }

  head() {
    if (!!this.selectedModel?.meta_slug) {
      this.selectedModel.meta_image = this.selectedModel.logo?.url || undefined;
    }
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.selectedModel, this.$route.fullPath);
  }
}
</script>
