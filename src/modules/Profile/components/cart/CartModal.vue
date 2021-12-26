<template>
  <BaseModalFullScreen :back-enabled="false" :isPinnedHeader="true" @close="$emit('close')">
    <template #right-side>
      <Cart />
    </template>
  </BaseModalFullScreen>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component
export default class CartModal extends Vue{
}
</script>
