<template>
  <div>
    <div>{{ day.name }}</div>
    <div>{{ day.content }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class ProgrammDay extends Vue {
  @Prop()
  day: { name: string; content: string };
}
</script>

<style lang="scss"></style>
