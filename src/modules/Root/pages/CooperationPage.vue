<template>
  <div class="page-wrapper">
    <BaseStaticBanner :image-src="bannerSrc" />
    <main class="container flex flex-col w-full md:w-1/2 ml-auto mr-auto">
      <h1>{{ title }}</h1>
      <section class="mt-30 md:mt-60" v-html="description"></section>

      <section class="mt-30 md:mt-60 w-full md:w-9/12">
        <div class="text-24 font-semibold">
          Заполните форму для сотрудничества с KAYPRO <br />
          и мы с Вами свяжемся!
        </div>
        <LazyFeedbackForm class="mt-40 md:mt-60"></LazyFeedbackForm>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import SeoModel from "@/_core/models/SeoModel";
import { EmptyService } from "@/_core/service/EmptyService";

class CooperationPageModel extends SeoModel {
  content: {
    description: string;
    title: string;
  };

  banner: {
    url: string;
  };
}

@Component
export default class CooperationPage extends Vue {
  pageModel: CooperationPageModel = new CooperationPageModel();

  async fetch() {
    this.pageModel = await this.$serviceLocator
      .getService(EmptyService)
      .getOneOrDefault(CooperationPageModel, "users/pages/cooperation");
  }

  get bannerSrc() {
    return this.pageModel.banner?.url || null;
  }

  get title() {
    return this.pageModel.content?.title || null;
  }

  get description() {
    return this.pageModel.content?.description || null;
  }

  head() {
    if (!!this.pageModel) {
      return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.pageModel, this.$route.fullPath);
    }
  }
}
</script>
