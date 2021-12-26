<template>
  <img src="/images/header_logo.png" class="cursor-pointer" width="132" height="50" @click="goToMainPage()" />
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class HeaderLogo extends Vue {
  goToMainPage() {
    if (this.$route.name !== "main") {
      this.$router.push({ name: "main" });
    }
  }
}
</script>
