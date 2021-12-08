<template>
  <div>
    <img src="/images/footer-logo.svg" class="cursor-pointer" width="132" height="50" @click="goToMainPage()" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class FooterLogo extends Vue {
  goToMainPage() {
    if (this.$route.name !== "main") {
      this.$router.push({ name: "main" });
    }
  }
}
</script>
