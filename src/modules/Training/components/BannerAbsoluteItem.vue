<template>
  <div v-if="model" class="flex flex-col">
    <div class="bg-primary text-14 w-max rounded-full px-16 py-8 text-white">{{ statusName }}</div>
    <div class="mb:mt-60 mt-40 font-normal">{{ dateType }}</div>
    <h1 class="font-compact text-60 mt-24 uppercase">{{ model.name }}</h1>
    <base-button class="base-button mt-18 w-max flex-shrink-0 grow bg-white lg:mt-40" @click="onSubscribeClicked">
      Записаться на курс
    </base-button>
    <div class="text-14 mt-32 flex font-normal md:mt-60">
      <div>
        <div>Спикер</div>
        <div class="text-18 mt-6 font-semibold">{{ model.lecturer }}</div>
      </div>
      <div class="md:ml-70 ml-40">
        <div>Длительность</div>
        <div class="text-18 mt-6 font-semibold">{{ model.duration }}</div>
      </div>
      <div class="md:ml-70 ml-40">
        <div>Город</div>
        <div class="text-18 mt-6 font-semibold">{{ model.city }}</div>
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
    return `${dayjs(this.model.date?.split("T")[0]).format("DD MMMM YYYY")} | ${this.model.is_online ? "онлайн" : "оффлайн"}`;
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
