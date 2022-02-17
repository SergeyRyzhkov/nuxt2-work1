<template>
  <main class="page-wrapper container">
    <BreadCrumbs />

    <div class="arenda-banner flex flex-col justify-between p-16 md:p-40 lg:flex-row lg:items-center">
      <div class="flex flex-col md:flex-row md:items-center">
        <h1 class="flex-shrink-0 grow">Аренда студии</h1>
        <p class="w-full break-all text-14 md:ml-40 lg:w-1/2 xl:ml-60">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
        </p>
      </div>
      <BaseButton class="mt-18 w-max flex-shrink-0 grow bg-white lg:mt-0" @click="$router.push({ name: 'training-arenda-card' })"
        >Узнать больше</BaseButton
      >
    </div>
    <div class="mt-40 flex flex-col md:mt-60 md:flex-row md:items-center md:justify-between">
      <h1>Обучение</h1>
      <base-calendar
        v-model="daysRange"
        class="mt-16 md:mt-0"
        :config="{
          isMultiple: true,
          calendarsCount: 1,
          isDateRange: true,
          isDatePicker: false,
          placeholder: 'Выберите дату',
        }"
        @clear="clearDateRange"
      ></base-calendar>
    </div>

    <div v-if="!trainingList.length" class="mt-60 lg:mt-100">
      <h3>Нет обучений, измените параметра поиска</h3>
    </div>

    <div class="training-list-wrapper mt-40">
      <TrainingItem v-for="iter in trainingList" :key="iter.id" :item="iter"> </TrainingItem>
    </div>

    <div v-if="$fetchState.pending" class="training-list-wrapper mt-0">
      <SkeletonTrainingItem v-for="index in 6" :key="index"> </SkeletonTrainingItem>
    </div>

    <BasePagination :pagination="pagination" class="mt-40 lg:mt-60" @update:page="onUpdatePage"></BasePagination>
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
    this.updateBreadCrumbs();
    await this.updateData();
  }

  async updateData() {
    const data = await this.$serviceLocator
      .getService(TrainingService)
      .getAll(this.pagination, this.daysRange.dateRange.start, this.daysRange.dateRange.end);
    this.pagination = data.pagination;
    this.trainingList = data.data;
  }

  onUpdatePage(pageNmb: number) {
    this.pagination.currentPage = pageNmb;
    this.updateData();
  }

  @Watch("daysRange", { deep: true })
  onDaysRangeChanged() {
    if (!!this.daysRange.dateRange.end) {
      this.resetData();
    }
  }

  clearDateRange() {
    this.daysRange = new DaysRangeModel();
    this.resetData();
  }

  resetData() {
    this.trainingList = [];
    this.pagination = new Pagination();
    return this.updateData();
  }

  updateBreadCrumbs() {
    const breadCrumbList = [{ linkName: "Главная", name: "main" }, { linkName: "Обучение" }];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }
}
</script>

<style lang="scss">
.training-list-wrapper {
  @apply grid grid-cols-1 gap-y-30 gap-x-30 md:grid-cols-2 lg:grid-cols-3;
}
.arenda-banner {
  background: linear-gradient(268.69deg, #baccff -0.81%, #f2e1dc 60.12%), #eaeaea;
}
</style>
