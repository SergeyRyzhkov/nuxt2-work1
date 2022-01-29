<template>
  <div class="w-[124px] sm:w-[153px]">
    <img
      v-lazysrc="'/images/footer-logo.svg'"
      alt=" "
      class="w-full cursor-pointer"
      width="152"
      height="68"
      @click="goToMainPage()"
    />
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
