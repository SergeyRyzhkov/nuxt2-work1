<template>
  <button class="btn" v-bind="{ ...$attrs }" @click="$emit('click')">
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
