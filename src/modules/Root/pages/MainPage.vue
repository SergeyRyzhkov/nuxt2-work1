<template>
  <main class="page-wrapper">
    <section class="bg-nude container-fluid">
      <div class="container bg-nude"><img src="/images/_tmp/1.jpg" width="1350" height="831" /></div>
    </section>
    <section class="container mt-40 md:mt-60 flex flex-col">
      <div class="flex flex-col ml-auto mr-auto items-center">
        <h2>Доступ к оптовым ценам</h2>
        <span class="mt-10">Заполните заявку на сотрудничество</span>
        <base-button class="mt-20 md:mt-40 w-max" @click="openForm()">Заполнить</base-button>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import CooperationForm from "@/components/CooperationForm.vue";
import { EmptyService } from "@/_core/service/EmptyService";
import SeoModel from "@/_core/models/SeoModel";

class MainPageModel extends SeoModel {}

@Component
export default class MainPage extends Vue {
  model: MainPageModel = new MainPageModel();

  async fetch() {
    this.model = await this.$serviceLocator.getService(EmptyService).getAnyOrNull("users/pages/home");
  }

  head() {
    // Тут еще картинку
    if (this.model) {
      return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.model, this.$route.fullPath);
    }
  }

  openForm() {
    this.$modalManager.modalShow(CooperationForm, {}, { classes: "v--modal vue-dialog-w-max" });
  }
}
</script>
