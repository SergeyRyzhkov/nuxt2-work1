<template>
  <div class="layout-wrapper">
    <TheHeader class="hidden lg:block"> </TheHeader>
    <TheMobileHeader class="block lg:hidden"></TheMobileHeader>
    <nuxt />
    <LazyHydrate when-visible>
      <TheFooter class="mt-40 md:mt-60"></TheFooter>
    </LazyHydrate>
    <client-only><BaseBackToTop></BaseBackToTop></client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import LazyHydrate from "vue-lazy-hydration";

@Component({
  components: {
    LazyHydrate,
  },
})
export default class DefaultLayout extends Vue {
  public head() {
    const canonical = `${this.$config.siteUrl}${this.$route.path.toLowerCase()}`;
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
