<template>
  <main v-if="!$fetchState.pending" class="page-wrapper container">
    <BreadCrumbs />

    <div class="hidden flex-col md:flex md:flex-row">
      <FaqLeftSide class="w-full md:w-1/4" :faq-model="faqList" @select-item="faqSelected"></FaqLeftSide>
      <div class="w-full md:w-1/2" v-html="selectedFaq.description"></div>
    </div>

    <div class="md:hidden">
      <BaseAccordion v-for="(item, index) in faqList.content.context" :key="index" :is-arrow="true" class="mb-12">
        <template #header>
          <div class="text-14 text-secondary pb-12">{{ item.title }}</div>
        </template>
        <template #content><div class="my-12" v-html="item.description"></div></template>
      </BaseAccordion>
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
    const breadCrumbList = [{ linkName: "Главная", name: "main" }, { linkName: this.isFaq ? "Вопрос-ответ" : "Документы" }];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  head() {
    if (!this.faqList) {
      return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.faqList, this.$route.fullPath);
    }
  }
}
</script>
