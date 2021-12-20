<template>
  <div>
    <div class="text-14">{{ model.description }}</div>
    <div class="text-14 mt-24">Адрес:</div>
    <div class="text-14 mt-4">{{ model.location }}</div>
    <div class="mt-40 mb:mt-60">
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
