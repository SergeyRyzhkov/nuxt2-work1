<template>
  <main v-if="!$fetchState.pending" class="page-wrapper container">
    <BreadCrumbs />
    <div class="flex items-center justify-between">
      <h1>Обучение</h1>
      <base-calendar
        v-model="daysRange"
        class="hidden md:block"
        :config="{
          isMultiple: true,
          calendarsCount: 1,
          isDateRange: true,
          isDatePicker: false,
          placeholder: 'Выберите дату',
        }"
      ></base-calendar>
    </div>

    <div class="training-list-wrapper mt-30 md:mt-40">
      <TrainingItem v-for="iter in trainingList" :key="iter.meta_slug" :item="iter"> </TrainingItem>
    </div>
    <BasePagination :pagination="pagination" class="mt-30 md:mt-60" @update:page="onUpdatePagination"></BasePagination>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Vue, Watch } from "nuxt-property-decorator";
import TrainingModel from "../models/TrainingModel";
import { TrainingService } from "../TrainingService";
import { Pagination } from "@/_core/models/Pagination";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";
import { DaysRangeModel } from "@/components/forms/BaseCalendar.vue";

@Component
export default class TrainingListPage extends Vue {
  trainingList: TrainingModel[] = [];
  pagination: Pagination = new Pagination();

  daysRange: DaysRangeModel = new DaysRangeModel();

  async fetch() {
    await this.updateData();
    this.updateBreadCrumbs();
  }

  @Watch("daysRange", { deep: true })
  onDaysRangeChanged() {
    if (!!this.daysRange.dateRange.end) {
      this.updateData();
    }
  }

  async updateData() {
    const result = await this.$serviceLocator
      .getService(TrainingService)
      .getAll(this.pagination, this.daysRange.dateRange.start, this.daysRange.dateRange.end);
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  row-gap: 48px;
  column-gap: 32px;
}
</style>
