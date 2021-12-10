<template>
  <div>
    <div class="text-24 font-semibold">
      Записаться на курс или <br />
      получить бесплатную консультацию
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import TrainingModel from "../models/TrainingModel";

@Component
export default class EnrollTraining extends Vue {
  @Prop()
  model: TrainingModel;
}
</script>

<style lang="scss"></style>
