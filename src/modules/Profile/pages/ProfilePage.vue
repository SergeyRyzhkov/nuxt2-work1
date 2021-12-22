<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <div class="flex flex-row">
      <CabinetMenu class="w-1/4" />
      <nuxt-child></nuxt-child>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import AppStore from "@/modules/Root/store/AppStore";

@Component
export default class ProfilePage extends Vue {
  fetch() {
    this.updateBreadCrumbs();
  }

  updateBreadCrumbs() {
    const breadCrumbList = [
      { linkName: "Главная", name: "main" },
      { linkName: "Профиль", name: "profile" },
    ];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }
}
</script>
