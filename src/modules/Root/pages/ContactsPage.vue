<template>
  <main class="container page-wrapper">
    <BreadCrumbs />
    <h1>Контакты</h1>
    <div class="flex lg:flex-row flex-col mt-40">
      <ContactsInfo class="lg:pr-56" />
      <ContactsForm class="lg:pl-56" />
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import AppStore from "@/modules/Root/store/AppStore";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";

@Component
export default class ContactsPage extends Vue {
  name: "ContactsPage";

  fetch() {
    this.updateBreadCrumbs();
  }

  updateBreadCrumbs() {
    const breadCrumbList = [
      { linkName: "Главная", name: "main" },
      { linkName: "Контакты", name: "contacts" },
    ];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }
}
</script>
