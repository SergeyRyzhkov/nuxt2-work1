<template>
  <div>{{ text }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class NewsItem extends Vue {
  @Prop()
  text;
}
</script>
