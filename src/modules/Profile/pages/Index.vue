<template>
<main class="page-wrapper container">
  <BreadCrumbs />
  <div class="flex flex-row">
    <div>
      <CabinetMenu />
    </div>
    <div class="pl-216 w-full">
      <PersonalData v-if="$route.name === 'profile'" />
      <router-view v-else></router-view>
    </div>
  </div>
</main>
</template>

<script lang="ts">
import {Vue, Component, getModule} from "nuxt-property-decorator";
import AppStore from "@/modules/Root/store/AppStore";

@Component
export default class Index extends Vue{

  fetch() {
    this.updateBreadCrumbs();
  }

  updateBreadCrumbs() {
    const breadCrumbList = [
      { linkName: "Главная", name: "main" },
      { linkName: "Профиль", name: "contacts" },
    ];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }
}
</script>

<style scoped>

</style>
