<template>
  <div>
    <div class="text-14">{{ model.description }}</div>
    <div class="text-14 mt-24">Адрес:</div>
    <div class="text-14 mt-4">{{ model.city }}</div>
    <div>
      <ProgrammDay v-for="(iter, idx) in model.days" :key="idx" :day="iter"></ProgrammDay>
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
