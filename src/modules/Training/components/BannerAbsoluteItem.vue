<template>
  <div v-if="model" class="flex flex-col">
    <div class="bg-primary px-16 py-8 rounded-full text-14 text-white w-max">{{ statusName }}</div>
    <div class="mt-40 mb:mt-60 font-normal">{{ dateType }}</div>
    <h1 class="mt-24 text-60 font-compact uppercase">{{ model.name }}</h1>
    <base-button class="base-button grow flex-shrink-0 mt-18 lg:mt-40 bg-white w-max" @click="onSubscribeClicked">
      Записаться на курс
    </base-button>
    <div class="flex text-14 font-normal mt-32 md:mt-60">
      <div>
        <div>Спикер</div>
        <div class="text-18 font-semibold mt-6">{{ model.lecturer }}</div>
      </div>
      <div class="ml-40 md:ml-70">
        <div>Длительность</div>
        <div class="text-18 font-semibold mt-6">{{ model.duration }}</div>
      </div>
      <div class="ml-40 md:ml-70">
        <div>Город</div>
        <div class="text-18 font-semibold mt-6">{{ model.city }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "nuxt-property-decorator";
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

  @Emit("subscribe-clicked")
  onSubscribeClicked(e) {
    return e.target.value;
  }
}
</script>

<style lang="scss"></style>
