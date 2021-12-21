<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <div class="flex flex-col md:flex-row">
      <FaqLeftSide class="w-full md:w-1/4" :faq-model="faqList" @select-item="faqSelected"></FaqLeftSide>
      <div class="w-full md:w-3/4" v-html="selectedFaq.description"></div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue } from "nuxt-property-decorator";
import FaqModel from "../models/FaqModel";
import AppStore from "../store/AppStore";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import { EmptyService } from "@/_core/service/EmptyService";

@Component
export default class MainPage extends Vue {
  @Prop({ default: true })
  isFaq: boolean;

  selectedFaq: { title?: string; description?: string } = {};
  faqList: FaqModel = new FaqModel();

  async fetch() {
    this.faqList = await this.$serviceLocator
      .getService(EmptyService)
      .getAnyOrNull(`users/pages/${this.isFaq ? "help" : "document"}`);
    this.updateBreadCrumbs();
  }

  faqSelected(item: { title: string; description: string }) {
    this.selectedFaq = item;
  }

  updateBreadCrumbs() {
    const breadCrumbList = [{ linkName: "Главная", name: "main" }, { linkName: "Вопрос-ответ" }];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }
}
</script>
