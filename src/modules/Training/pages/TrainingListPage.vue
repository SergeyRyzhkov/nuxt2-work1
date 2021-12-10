<template>
  <main v-if="!$fetchState.pending" class="page-wrapper container">
    <BreadCrumbs />
    <h1 class="mt-15 md:mt-30">Обучение</h1>
    <section class="training-list-wrapper mt-30 md:mt-40">
      <TrainingItem v-for="iter in trainingList" :key="iter.meta_slug" :item="iter"> </TrainingItem>
    </section>
    <BasePagination :pagination="pagination" class="mt-30 md:mt-60" @update:page="onUpdatePagination"></BasePagination>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import TrainingModel from "../models/TrainingModel";
import { TrainingService } from "../TrainingService";
import { Pagination } from "@/_core/models/Pagination";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";

@Component
export default class TrainingListPage extends Vue {
  trainingList: TrainingModel[] = [];
  pagination: Pagination = new Pagination();

  async fetch() {
    await this.updateData();
    this.updateBreadCrumbs();
  }

  async updateData() {
    const result = await this.$serviceLocator.getService(TrainingService).getAll(this.pagination);
    this.trainingList = result.data;
    this.pagination = result.pagination;
  }

  updateBreadCrumbs() {
    const breadCrumbList = [{ linkName: "Главная", name: "main" }, { linkName: "Обучение" }];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  onUpdatePagination(pageNmb: number) {
    this.pagination.currentPage = pageNmb;
    this.updateData();
  }

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }
}
</script>

<style lang="scss">
.training-list-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 400px));
  row-gap: 48px;
  -moz-column-gap: 15px;
  column-gap: 30px;
}
</style>
