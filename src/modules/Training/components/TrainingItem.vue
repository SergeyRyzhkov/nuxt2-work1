<template>
  <nuxt-link
    v-if="!!item"
    :to="{ name: 'training-card', params: { slug: `${item.meta_slug}-${item.id}` } }"
    class="flex flex-col cursor-pointer"
  >
    <div class="relative">
      <img
        v-lazysrc="imageSrc"
        width="420"
        height="223"
        class="h-223 w-full object-cover hover:scale-105 transition-all"
        alt=" "
      />
      <div class="absolute top-16 left-16 bg-primary px-16 py-8 rounded-full text-14 text-white">{{ statusName }}</div>
    </div>
    <div class="flex items-center justify-between mt-18">
      <div class="text-14">{{ dateTypeAddress }}</div>
      <div class="font-semibold">{{ priceFormatted }}</div>
    </div>
    <div class="text-18 mt-14">{{ item.name }}</div>
    <div class="mt-16 text-14">{{ item.lecturer }}</div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import dayjs from "dayjs";
import TrainingModel from "../models/TrainingModel";

@Component
export default class TrainingItem extends Vue {
  @Prop()
  item: TrainingModel;

  get imageSrc() {
    return this.item?.logo?.url || null;
  }

  get priceFormatted() {
    return !!this.item.price ? this.item.price.toLocaleString("ru-RU") + " ₽" : "Бесплатно";
  }

  get statusName() {
    return this.item.status === "completed" ? "Завершено" : "Планируется";
  }

  get dateTypeAddress() {
    return `${dayjs(this.item.date?.split("T")[0]).format("DD MMMM YYYY")} | ${this.item.is_online ? "онлайн" : "оффлайн"} | ${
      this.item.location || "Россия"
    }`;
  }
}
</script>

<style lang="scss"></style>
