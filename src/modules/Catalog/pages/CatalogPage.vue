<template>
  <main class="page-wrapper container">
    <BreadCrumbs :links="breadCrumbs" class="lg:block" :class="[{ hidden: !isLeafCategory }]" />

    <!-- Для мобилы -->
    <div v-if="mobileFilterVisible" class="fixed top-0 left-0 z-50 h-full w-screen overflow-hidden bg-white">
      <div class="mb-26 mt-16 flex items-center justify-between px-12">
        <span class="text-24">Фильтр</span>
        <span class="cursor-pointer text-32 font-normal after:content-['\00d7']" @click="toogleMenu()"></span>
      </div>
      <!-- <div class="h-full overflow-y-auto"> -->
      <CatalogNavigator class="h-full overflow-y-auto p-12" @category-clicked="onCategoryClicked"></CatalogNavigator>
      <!-- </div> -->
    </div>
    <!--  -->

    <div class="flex flex-col lg:flex-row">
      <div class="w-full lg:w-1/4">
        <div v-if="!isLeafCategory" class="hidden lg:block">
          <h1 class="mb-22">Каталог</h1>
          <CatalogNavigator class="mt-22" @category-clicked="onCategoryClicked"></CatalogNavigator>
        </div>
        <div v-if="isLeafCategory" class="flex flex-col">
          <h1 class="mb-28">{{ selectedModel.title }}</h1>
          <div v-if="!!selectedModel.parent" class="hidden lg:block">
            <div class="mb-16 text-18 font-semibold">Категория</div>
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

      <!-- Для мобилы -->
      <div
        v-if="!isLeafCategory"
        class="mb-36 flex w-full items-center justify-between lg:hidden"
        :class="{ 'mt-22': !isLeafCategory }"
      >
        <button type="button" class="flex items-center" @click="goBack()">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.99316 9.9873L1.98621 5.98035L5.99316 1.97339"
              stroke="#16192C"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <div class="flex cursor-pointer" @click="toogleMenu()">
          <div class="mr-16 text-14">Фильтр</div>
          <img src="/icons/filter.svg" width="24" height="24" />
        </div>
      </div>
      <!-- -->

      <div class="w-full lg:ml-40 lg:w-3/4">
        <nuxt-child :model="selectedModel"></nuxt-child>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import CategoryModel from "../models/CategoryModel";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import { RouteLink } from "@/_core/models/RouteLink";

@Component
export default class CatalogPage extends Vue {
  selectedModel: CategoryModel = new CategoryModel();
  breadCrumbs: RouteLink[] = [];

  mobileFilterVisible = false;

  async fetch() {
    await this.updateData();
  }

  @Watch("$route.path")
  async onRoutePathChanged() {
    await this.updateData();
  }

  toogleMenu() {
    this.mobileFilterVisible = !this.mobileFilterVisible;
    document.documentElement.style.overflowY = this.mobileFilterVisible ? "hidden" : "auto";
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
        ? await this.$serviceLocator.getService(CatalogService).getCategoryBySlug(lastSlug)
        : new CategoryModel();

    this.updateBreadCrumbs(this.selectedModel);
  }

  onCategoryClicked(model: CategoryModel) {
    document.documentElement.style.overflowY = "auto";
    this.mobileFilterVisible = false;
    const parms = this.$serviceLocator.getService(CatalogService).getRouteLocation(model);
    if (parms.name !== this.$route.name) {
      this.$router.push(parms);
    }
  }

  goBack() {
    if (this.selectedModel.id === 0) {
      this.$router.push({ name: "main" });
    }

    if (!this.isLeafCategory && this.selectedModel.id !== 0) {
      this.$router.push({ name: "catalog-root" });
    }
    if (this.isLeafCategory && !!this.parentCategoryRoute) {
      this.$router.push(this.parentCategoryRoute);
    }
  }

  updateBreadCrumbs(model: CategoryModel) {
    this.breadCrumbs = this.$serviceLocator.getService(CatalogService).buildBreadCrumb(model);
    // getModule(AppStore, this.$store).updateBreadCrumbList(this.$serviceLocator.getService(CatalogService).buildBreadCrumb(model));
  }

  head() {
    if (!!this.selectedModel?.meta_slug) {
      this.selectedModel.meta_image = this.selectedModel.logo?.url || undefined;
    }
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.selectedModel, this.$route.fullPath);
  }
}
</script>
