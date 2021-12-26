<template>
  <section v-if="!!item && !!item.meta_slug" class="flex flex-col cursor-pointer" @click="goToCard()">
    <div class="relative">
      <figure>
        <img v-lozad="imageSrc" width="300" height="160" class="h-160 hover:scale-105 transition-all" />
      </figure>
      <div class="absolute top-16 left-16 bg-primary px-16 py-8 rounded-full text-14 text-white">{{ statusName }}</div>
    </div>
    <div class="flex items-center justify-between mt-16">
      <div class="font-normal">{{ dateTypeAddress }}</div>
      <div class="font-semibold">{{ priceFormatted }}</div>
    </div>
    <div class="text-22 mt-12">{{ item.name }}</div>
    <div class="mt-12 font-normal">{{ item.lecturer }}</div>
  </section>
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

  goToCard() {
    // @ts-ignore
    this.$router.push({ name: "training-card", params: { slug: this.item.meta_slug } });
  }

  get priceFormatted() {
    return !!this.item.price ? this.item.price.toLocaleString("ru-RU") + " ₽" : "Бесплатно";
  }

  get statusName() {
    return this.item.status === "completed" ? "Завершено" : "Планируется";
  }

  get dateTypeAddress() {
    return `${dayjs(this.item.date?.split("T")[0]).format("DD MMMM")} | ${this.item.is_online ? "онлайн" : "оффлайн"} | ${
      this.item.location || "Россия"
    }`;
  }
}
</script>

<style lang="scss"></style>
