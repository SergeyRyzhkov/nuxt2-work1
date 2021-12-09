<template>
  <button class="btn" @click="$emit('click')" v-bind="{ ...$attrs }">
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
@Component
export default class BaseButton extends Vue {}
</script>

<style lang="scss" scoped>
.btn {
  @apply w-full text-white bg-primary text-center p-18;
}
</style>
