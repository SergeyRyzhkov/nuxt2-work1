<template>
  <div>
    <video v-bind="$attrs" v-on="$listeners"></video>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({ inheritAttrs: false })
export default class BaseVideoPlayer extends Vue {}
</script>
