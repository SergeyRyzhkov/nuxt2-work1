<template>
  <BaseAccordion>
    <template #header>
      <span>{{ dayNumber + " день. " + day.name }}</span>
    </template>
    <template #content><div class="text-14" v-html="day.content"></div></template>
  </BaseAccordion>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class ProgrammDay extends Vue {
  @Prop()
  day: { name: string; content: string };

  @Prop({ default: 1 })
  dayNumber;
}
</script>
