<template>
  <div class="flex items-center">
    <img src="/images/header_heart.svg" width="24" height="24" />
    <img src="/images/header_shop.svg" width="22" height="22" class="ml-24 lg:ml-48" />
    <img src="/images/header_user.svg" width="19" height="19" class="ml-24 lg:ml-48" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class HeaderUser extends Vue {}
</script>
