<template>
  <main v-if="!$fetchState.pending" class="page-wrapper container">
    <BreadCrumbs />
    <div class="arenda-banner flex flex-col justify-between lg:flex-row lg:items-center p-16 md:p-40">
      <div class="flex flex-col md:flex-row md:items-center">
        <h1 class="grow flex-shrink-0">Аренда студии</h1>
        <p class="text-14 break-all md:ml-40 xl:ml-60 w-full lg:w-1/2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
        </p>
      </div>
      <BaseButton class="grow flex-shrink-0 mt-18 lg:mt-0 bg-white w-max" @click="$router.push({ name: 'training-arenda-card' })"
        >Узнать больше</BaseButton
      >
    </div>
    <div class="flex items-center justify-between mt-40 md:mt-60">
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
        @clear="clearDate"
      ></base-calendar>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-30 gap-x-30 mt-30 md:mt-40">
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

  clearDate() {
    this.daysRange = new DaysRangeModel();
    this.pagination.currentPage = 1;
    this.updateData();
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
.arenda-banner {
  background: linear-gradient(268.69deg, #baccff -0.81%, #f2e1dc 60.12%), #eaeaea;
}
</style>
