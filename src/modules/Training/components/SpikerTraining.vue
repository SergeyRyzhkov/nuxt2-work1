<template>
  <div v-if="!!model" class="flex flex-col">
    <div class="flex flex-row align-baseline">
      <img :src="imageSrc" class="rounded-full object-cover object-center w-80 h-80" width="80" height="80" />
      <div class="ml-18">
        <div class="text-18 font-semibold">{{ model.lecturer }}</div>
        <div class="text-14 text-font-gray mt-10">{{ model.lecturer_position }}</div>
      </div>
    </div>
    <div class="mt-18 text-14">{{ model.lecturer_description }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import TrainingModel from "../models/TrainingModel";

@Component
export default class SpikerTraining extends Vue {
  @Prop()
  model: TrainingModel;

  get imageSrc() {
    return this.model.lecturer_avatar?.url || "images/spiker_default.jpg";
  }
}
</script>

<style lang="scss"></style>
