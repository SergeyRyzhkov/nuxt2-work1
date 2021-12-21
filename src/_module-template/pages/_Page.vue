<template>
  <main class="container mt-16 text-red-600">dsfdsfdsf</main>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class _Page extends Vue {
  //  head() {
  //   if (!!this.model.meta_slug) {
  //     this.model.meta_image = this.model.logo?.url || this.model.banner?.url || undefined;
  //     return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.model, this.$route.fullPath);
  //   }
  // }
  // updateBreadCrumbs() {
  //   const breadCrumbList = [
  //     { linkName: "Главная", name: "main" },
  //     { linkName: "Обучение", name: "training" },
  //     { linkName: this.model?.name?.substring(0, 120) + "..." },
  //   ];
  //   getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  // }
}
</script>
