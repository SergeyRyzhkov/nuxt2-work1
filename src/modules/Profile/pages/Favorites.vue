<template>
<main class="page-wrapper container">
  <BreadCrumbs />
  <h1>Избранное</h1>
  <div class="mt-32 mb-62 lg:mb-200">
    <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-y-60 gap-y-28 gap-x-9 gap-x-30 ">
      <FavoriteItem  v-for="i in 16" :key="i"/>
    </div>
<!--    <BasePagination :pagination="pagination" class="mt-30 md:mt-60" @update:page="onUpdatePagination"></BasePagination>-->
  </div>

</main>
</template>

<script lang="ts">
import {Vue, Component, getModule} from "nuxt-property-decorator";
import AppStore from "@/modules/Root/store/AppStore";
import FavoritesModel from "@/modules/Profile/models/FavoritesModel";
import {ProfileService} from "@/modules/Profile/ProfileService";

@Component
export default class Favorites extends Vue{
  model: FavoritesModel = new FavoritesModel()

  async fetch() {
    this.updateBreadCrumbs();
    // this.model = await this.$serviceLocator.getService(ProfileService).getFavorites();
  }


  updateBreadCrumbs() {
    const breadCrumbList = [{ linkName: "Главная", name: "main" }, { linkName: "Избранное" }];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }
}
</script>
<style lang="scss">
</style>
