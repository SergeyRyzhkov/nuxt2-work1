<template>
  <main class="page-wrapper">
    <div v-show="$fetchState.pending" class="container">
      <SkeletonTrainingPage></SkeletonTrainingPage>
    </div>
    <section class="container-fluid relative min-h-[max-content] overflow-hidden">
      <img
        v-show="!!bannerSrc"
        :src="bannerSrc"
        class="absolute top-0 left-0 h-full w-full object-cover"
        height="600"
        width="1440"
      />
      <div class="relative w-full">
        <div class="container z-50 my-60 flex flex-col md:my-70">
          <div class="w-max rounded-full bg-primary px-16 py-8 text-14 text-white">{{ statusName }}</div>
          <div class="mb:mt-60 mt-40 font-normal">{{ dateType }}</div>
          <h1 class="mt-24 font-compact text-62 uppercase">{{ model.name }}</h1>
          <base-button class="base-button mt-18 w-max flex-shrink-0 grow bg-white lg:mt-40" @click="onSubscribeClicked">
            Записаться на курс
          </base-button>
          <div class="mt-32 flex text-14 font-normal md:mt-60">
            <div>
              <div>Спикер</div>
              <div class="mt-6 text-18 font-semibold">{{ model.lecturer }}</div>
            </div>
            <div class="ml-40 md:ml-70">
              <div>Длительность</div>
              <div class="mt-6 text-18 font-semibold">{{ model.duration }}</div>
            </div>
            <div class="ml-40 md:ml-70">
              <div>Город</div>
              <div class="mt-6 text-18 font-semibold">{{ model.city }}</div>
            </div>
          </div>
        </div>
      </div>
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
        <div class="training-section__content text-48 font-semibold">
          <div>{{ priceFormatted }}</div>
          <div class="mt-16 text-14 font-semibold">{{ model.price_description }}</div>
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
import dayjs from "dayjs";
import TrainingModel from "../models/TrainingModel";
import { TrainingService } from "../TrainingService";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";
import Cacheable from "@/_core/MethodCacheDecorator";

@Component
export default class TrainingPage extends Vue {
  @Prop()
  slug: string;

  @Ref() readonly enrollTraining!: any;

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

  get dateType() {
    return `${dayjs(this.model.date?.split("T")[0]).format("DD MMMM YYYY")} | ${this.model.is_online ? "онлайн" : "оффлайн"}`;
  }

  get statusName() {
    return this.model.status === "completed" ? "Завершено" : "Планируется";
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
  @apply container flex flex-col pt-20 pb-40 md:flex-row md:pb-60 md:pt-40;

  .training-section__caption {
    @apply w-full font-semibold md:w-3/12;
  }

  .training-section__content {
    @apply ml-0 mt-20 w-full md:ml-20 md:mt-0 md:w-6/12;
  }
}
</style>
