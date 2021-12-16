<template>
  <div v-if="!$fetchState.pending" class="page-wrapper">
    <BaseStaticBanner v-if="bannerSrc" :image-src="bannerSrc" class="bg-strong-nude" />
    <main class="container flex flex-col">
      <h1>{{ title }}</h1>
      <section class="mt-30 md:mt-60 ml-auto mr-auto w-full md:w-3/4" v-html="description"></section>
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
