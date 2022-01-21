<template>
  <LazyHydrate when-visible>
    <nuxt-link
      v-if="!!item"
      :to="{ name: 'training-card', params: { slug: `${item.meta_slug}-${item.id}` } }"
      class="flex flex-col cursor-pointer"
    >
      <div class="relative">
        <img v-lozad="imageSrc" width="300" height="160" class="h-160 hover:scale-105 transition-all" alt=" " />
        <div class="absolute top-16 left-16 bg-primary px-16 py-8 rounded-full text-14 text-white">{{ statusName }}</div>
      </div>
      <div class="flex items-center justify-between mt-16">
        <div class="text-14">{{ dateTypeAddress }}</div>
        <div class="font-semibold">{{ priceFormatted }}</div>
      </div>
      <div class="text-22 mt-12">{{ item.name }}</div>
      <div class="mt-12 text-14">{{ item.lecturer }}</div>
    </nuxt-link>
  </LazyHydrate>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import dayjs from "dayjs";
import LazyHydrate from "vue-lazy-hydration";
import TrainingModel from "../models/TrainingModel";

@Component({
  name: "TrainingItem",
  components: {
    LazyHydrate,
  },
})
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
