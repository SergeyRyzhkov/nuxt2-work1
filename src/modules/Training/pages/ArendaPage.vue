<template>
  <main v-if="!$fetchState.pending">
    <div class="arenda-page container-fluid relative flex h-400 items-end">
      <div class="container relative mb-32 w-full md:mb-55 md:w-8/12 xl:w-1/2">
        <h1>{{ model.content.title }}</h1>
      </div>
    </div>
    <section
      class="page-wrapper container mt-32 ml-auto mr-auto w-full md:mt-55 md:w-8/12 xl:w-1/2"
      v-html="model.content.description"
    ></section>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import { EmptyService } from "@/_core/service/EmptyService";
import SeoModel from "@/_core/models/SeoModel";

class RentContentModel extends SeoModel {
  content: { title: string; description: string };
}

@Component
export default class ArendaPage extends Vue {
  model = new RentContentModel();

  async fetch() {
    this.model = await this.$serviceLocator.getService(EmptyService).getAnyOrNull("users/pages/studio_rent");
  }

  head() {
    if (!!this.model) {
      return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.model, this.$route.fullPath);
    }
  }
}
</script>

<style lang="scss">
.arenda-page {
  background: linear-gradient(268.69deg, #baccff -0.81%, #f2e1dc 60.12%), #eaeaea;
}
</style>
