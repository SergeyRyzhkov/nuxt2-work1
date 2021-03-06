<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <div v-if="isDataExists" class="hidden flex-col md:flex md:flex-row">
      <FaqLeftSide class="w-full md:w-1/4" :faq-model="faqList" :selected-faq="selectedFaq" @select-item="onSelect"></FaqLeftSide>
      <div class="w-full md:w-1/2" v-html="selectedFaq.description"></div>
    </div>

    <div v-if="isDataExists" class="md:hidden">
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
import { Component, getModule, Prop, Vue, Watch } from "nuxt-property-decorator";
import FaqModel from "../models/FaqModel";
import AppStore from "../store/AppStore";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import { EmptyService } from "@/_core/service/EmptyService";
import Cacheable from "@/_core/MethodCacheDecorator";

@Component
export default class MainPage extends Vue {
  @Prop({ default: true })
  isFaq: boolean;

  @Prop()
  title;

  @Watch("title")
  async onTitleChanged() {
    await this.updateData();
  }

  selectedFaq: { title?: string; description?: string } = { title: "", description: "" };
  faqList: FaqModel = new FaqModel();

  async fetch() {
    this.updateBreadCrumbs();
    await this.updateData();
  }

  async updateData() {
    this.faqList = this.isFaq ? await this.getHelpData() : await this.getDocsData();
    if (!!this.title) {
      this.selectedFaq = this.title;
    } else {
      this.selectedFaq = this.faqList.content?.context[0];
    }
  }

  get isDataExists() {
    return this.faqList?.content?.context?.length > -1;
  }

  get extTitle() {
    return this.title?.title;
  }

  @Cacheable(0)
  async getHelpData() {
    return await this.$serviceLocator.getService(EmptyService).getAnyOrNull("users/pages/help");
  }

  @Cacheable(0)
  async getDocsData() {
    return await this.$serviceLocator.getService(EmptyService).getAnyOrNull("users/pages/document");
  }

  onSelect(item: { title: string; description: string }) {
    this.selectedFaq = item;
  }

  updateBreadCrumbs() {
    const breadCrumbList = [{ linkName: "Главная", name: "main" }, { linkName: this.isFaq ? "Помощь" : "Документы" }];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  head() {
    if (!this.faqList) {
      return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.faqList, this.$route.fullPath);
    }
  }
}
</script>
