<template>
  <div class="layout-wrapper">
    <TheHeader v-if="$route.name !== 'login'"> </TheHeader>
    <nuxt />
    <TheFooter v-if="$route.name !== 'login'"></TheFooter>
    <client-only><BaseBackToTop></BaseBackToTop></client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class DefaultLayout extends Vue {
  public head() {
    const canonical = `${this.$config.siteUrl}/${this.$route.path.toLowerCase()}`;
    return {
      link: [
        {
          rel: "canonical",
          href: canonical.endsWith("/") ? canonical.slice(0, -1) : canonical,
        },
      ],
    };
  }
}
</script>
