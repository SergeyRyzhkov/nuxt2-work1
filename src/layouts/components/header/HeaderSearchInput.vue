<template>
  <BaseInput placeholder="Искать товар" classes="header-search-input">
    <svg
      class="header-search-input__icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10.4298" cy="11" r="6.575" transform="rotate(-45 10.4298 11)" stroke="#16192C" stroke-width="1.6" />
      <path d="M15.1144 15.6846L18.9151 19.4853" stroke="#16192C" stroke-width="1.6" />
    </svg>
  </BaseInput>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class HeaderSearchInput extends Vue {}
</script>

<style lang="scss">
.header-search-input {
  border-radius: 9999px !important;
  height: 46px;
  padding: 13px 23px 16px 23px;
  border: 1px solid #DFDFDF !important;

  &__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 14px;
  }
}
</style>
