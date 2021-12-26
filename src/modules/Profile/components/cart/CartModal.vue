<template>
  <BaseModalFullScreen :back-enabled="false" :is-pinned-header="true" @close="$emit('close')">
    <template #right-side>
      <ShoppingCart @close="$emit('close')" />
    </template>
  </BaseModalFullScreen>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class CartModal extends Vue {}
</script>
