<template>
  <div v-if="model" class="flex flex-col">
    <div class="w-max rounded-full bg-primary px-16 py-8 text-14 text-white">{{ statusName }}</div>
    <div class="mb:mt-60 mt-40 font-normal">{{ dateType }}</div>
    <h1 class="mt-24 font-compact text-60 uppercase">{{ model.name }}</h1>
    <base-button class="base-button mt-18 w-max flex-shrink-0 grow bg-white lg:mt-40" @click="onSubscribeClicked">
      Записаться на курс
    </base-button>
    <div class="mt-32 flex text-14 font-normal md:mt-60">
      <div>
        <div>Спикер</div>
        <div class="mt-6 text-18 font-semibold">{{ model.lecturer }}</div>
      </div>
      <div class="ml-40 md:ml-70">
        <div>Длительность</div>
        <div class="mt-6 text-18 font-semibold">{{ model.duration }}</div>
      </div>
      <div class="ml-40 md:ml-70">
        <div>Город</div>
        <div class="mt-6 text-18 font-semibold">{{ model.city }}</div>
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
