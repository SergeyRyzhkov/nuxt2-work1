<template>
  <main v-if="!$fetchState.pending && !!model.meta_slug" class="page-wrapper">
    <div class="container">
      <BreadCrumbs />
    </div>
    <section>
      <img v-if="bannerSrc" src="bannerSrc" />
    </section>
    <section class="container-fluid">
      <div class="training-section-wrapper">
        <h2 class="training-section__caption">ПРОГРАММА</h2>
        <div class="training-section__content"><ProgramaTraining :model="model"></ProgramaTraining></div>
      </div>
    </section>
    <section class="container-fluid bg-nude">
      <div class="training-section-wrapper">
        <h2 class="training-section__caption container-fluid">СПИКЕР</h2>
        <div class="training-section__content"><SpikerTraining :model="model"></SpikerTraining></div>
      </div>
    </section>
    <section class="container-fluid bg-section-gray">
      <div class="training-section-wrapper">
        <h2 class="training-section__caption">СТОИМОСТЬ КУРСА</h2>
        <div class="training-section__content text-48 font-bold">
          <div>{{ priceFormatted }}</div>
          <div class="text-14 font-semibold mt-16 underline cursor-pointer">Скачать программу курса</div>
        </div>
      </div>
    </section>
    <section class="container-fluid">
      <div class="training-section-wrapper">
        <h2 class="training-section__caption"></h2>
        <div class="training-section__content"><EnrollTraining :model="model" /></div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue } from "nuxt-property-decorator";
import TrainingModel from "../models/TrainingModel";
import { TrainingService } from "../TrainingService";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";

@Component
export default class TrainingPage extends Vue {
  @Prop()
  slug: string;

  model: TrainingModel = new TrainingModel();

  async fetch() {
    this.model = await this.$serviceLocator.getService(TrainingService).getBySlug(this.slug);
    this.updateBreadCrumbs();
  }

  get bannerSrc() {
    return this.model.banner?.url || undefined;
  }

  get priceFormatted() {
    return !!this.model.price ? this.model.price.toLocaleString("ru-RU") + " ₽" : "Бесплатно";
  }

  head() {
    if (!!this.model.meta_slug) {
      this.model.meta_image = this.model.logo?.url || this.model.banner?.url || undefined;
      return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.model, this.$route.fullPath);
    }
  }

  updateBreadCrumbs() {
    const breadCrumbList = [
      { linkName: "Главная", name: "main" },
      { linkName: "Обучение", name: "training" },
      { linkName: this.model?.name?.substring(0, 120) + "..." },
    ];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }
}
</script>

<style lang="scss">
.training-section-wrapper {
  @apply flex flex-col md:flex-row py-40 md:py-60 container;

  .training-section__caption {
    @apply w-full md:w-3/12 font-semibold;
  }

  .training-section__content {
    @apply w-full md:w-6/12 ml-0 md:ml-20 mt-20 md:mt-0;
  }
}
</style>
