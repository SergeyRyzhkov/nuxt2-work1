<template>
  <main class="page-wrapper">
    <BaseStaticBanner :image-src="bannerSrc" style="max-height: max-content" :wide="true">
      <div class="absolute w-screen" :class="[!bannerSrc ? 'top-0 py-24 md:py-40' : 'top-16 md:top-32']">
        <BannerAbsoluteItem class="container" :model="model" @subscribe-clicked="onSubscribeClicked()"></BannerAbsoluteItem>
      </div>
    </BaseStaticBanner>
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
        <div class="training-section__content text-48 font-semibold">
          <div>{{ priceFormatted }}</div>
          <div class="text-14 mt-16 font-semibold">{{ model.price_description }}</div>
        </div>
      </div>
    </section>
    <section class="container-fluid">
      <div class="training-section-wrapper">
        <h2 class="training-section__caption"></h2>
        <div class="training-section__content"><EnrollTraining ref="enrollTraining" :model="model" /></div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Prop, Ref, Vue } from "nuxt-property-decorator";
import TrainingModel from "../models/TrainingModel";
import { TrainingService } from "../TrainingService";
import EnrollTraining from "../components/EnrollTraining.vue";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";
import Cacheable from "@/_core/MethodCacheDecorator";

@Component
export default class TrainingPage extends Vue {
  @Prop()
  slug: string;

  @Ref() readonly enrollTraining!: EnrollTraining;

  model: TrainingModel = new TrainingModel();

  async fetch() {
    this.model = await this.getModelById(this.slug);
    this.updateBreadCrumbs();
  }

  @Cacheable(0)
  async getModelById(slug: string) {
    return await this.$serviceLocator.getService(TrainingService).getBySlug(slug);
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

  onSubscribeClicked() {
    this.enrollTraining?.$el?.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<style lang="scss">
.training-section-wrapper {
  @apply container flex flex-col pt-20 pb-40 md:flex-row md:pt-40 md:pb-60;

  .training-section__caption {
    @apply w-full font-semibold md:w-3/12;
  }

  .training-section__content {
    @apply ml-0 mt-20 w-full md:ml-20 md:mt-0 md:w-6/12;
  }
}
</style>
