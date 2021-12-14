<template>
  <button class="base-button" :classes="classes" v-bind="{ ...$attrs }" @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
@Component
export default class BaseButton extends Vue {
  @Prop()
  classes;
}
</script>

<style lang="scss" scoped>
.base-button {
  padding: 14px 60px 14px 60px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  border: 1px solid $primary;
  border-radius: 9999px;
  transition: all 0.3s ease;
  &:hover {
    background-color: $primary;
    color: white;
  }
}
</style>
