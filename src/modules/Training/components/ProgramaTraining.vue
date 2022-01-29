<template>
  <div>
    <div class="text-14">{{ model.description }}</div>
    <div class="mt-24 text-14">Адрес:</div>
    <div class="mt-4 text-14">{{ model.location }}</div>
    <div class="mb:mt-60 mt-40">
      <ProgrammDay v-for="(iter, idx) in model.days" :key="idx" :day="iter" :day-number="idx + 1"></ProgrammDay>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import TrainingModel from "../models/TrainingModel";

@Component
export default class ProgramaTraining extends Vue {
  @Prop()
  model: TrainingModel;
}
</script>

<style lang="scss"></style>
