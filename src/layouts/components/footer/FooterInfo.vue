<template>
  <div class="footer-menu-list">
    <div class="footer-title flex items-center justify-between" @click="openList">
      ИНФОРМАЦИЯ
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="lg:hidden"
        :class="{ show }"
      >
        <rect
          width="17.5226"
          height="1.75226"
          rx="0.87613"
          transform="matrix(-0.00859092 0.999963 -0.999963 0.00859092 11.7793 2.14966)"
          fill="white"
        />
        <rect
          width="17.5226"
          height="1.75226"
          rx="0.87613"
          transform="matrix(0.999963 -0.00859046 -0.00859046 0.999963 2.41895 10.2809)"
          fill="white"
        />
      </svg>
    </div>
    <ul class="footer-ul" :class="{ show }">
      <li>
        <nuxt-link :to="{ name: 'help' }">Помощь</nuxt-link>
      </li>
      <li v-for="(iter, index) in footerItems" :key="index">
        <a @click="gotoHelp(iter)">
          {{ iter.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { EmptyService } from "@/_core/service/EmptyService";
import Cacheable from "@/_core/MethodCacheDecorator";

@Component
export default class FooterInfo extends Vue {
  show: boolean = false;

  footerItems: { title?: string; meta_slug?: string; name?: string } = {};

  openList() {
    this.show = !this.show;
  }

  async fetch() {
    this.footerItems = await this.getFooterItems();
  }

  @Cacheable(0)
  async getFooterItems() {
    return await this.$serviceLocator.getService(EmptyService).getAnyOrNull("users/pages-footer");
  }

  async gotoHelp(iter: any) {
    try {
      await this.$router.push({
        name: iter.name,
        // @ts-ignore
        params: { title: iter, isFaq: iter.name === "help" },
        query: iter.meta_slug,
      });
    } catch {}
  }
}
</script>
