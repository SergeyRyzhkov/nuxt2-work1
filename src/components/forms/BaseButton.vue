<template>
  <button class="base-button" :classes="classes" v-bind="$attrs" v-on="$listeners">
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
  @apply md:px-68 md:py-16 px-40 py-13;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  border: 1px solid $primary;
  border-radius: 9999px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: $secondary;
    border-color: $secondary;
    color: white;
  }
}
</style>
