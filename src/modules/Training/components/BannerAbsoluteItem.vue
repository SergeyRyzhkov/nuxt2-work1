<template>
  <div v-if="model" class="flex flex-col">
    <div class="bg-primary px-16 py-8 rounded-full text-14 text-white w-max">{{ statusName }}</div>
    <div class="mt-40 mb:mt-60 font-normal">{{ dateType }}</div>
    <div class="mt-20 text-60">{{ model.name }}</div>
    <div class="bg-white px-32 py-16 rounded-full text-14 w-max mt-24 mb:mt-40">Записаться на курс</div>
    <div class="flex text-14 font-normal mt-40 mb:mt-60">
      <div>
        <div>Спикер</div>
        <div class="text-18 font-semibold mt-6">{{ model.lecturer }}</div>
      </div>
      <div class="ml-40 mb:ml-70">
        <div>Длительность</div>
        <div class="text-18 font-semibold mt-6">{{ model.duration }}</div>
      </div>
      <div class="ml-40 mb:ml-70">
        <div>Город</div>
        <div class="text-18 font-semibold mt-6">{{ model.city }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import dayjs from "dayjs";
import TrainingModel from "../models/TrainingModel";

@Component
export default class BannerAbsoluteItem extends Vue {
  @Prop()
  model: TrainingModel;

  get dateType() {
    return `${dayjs(this.model.date?.split("T")[0]).format("DD MMMM")} | ${this.model.is_online ? "онлайн" : "оффлайн"}`;
  }

  get statusName() {
    return this.model.status === "completed" ? "Завершено" : "Планируется";
  }
}
</script>

<style lang="scss"></style>
