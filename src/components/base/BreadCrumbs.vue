<template>
  <ul class="brc-breadcrumb" itemscope="itemscope" itemtype="https://schema.org/BreadcrumbList">
    <li
      v-for="(bread, idx) in breadCrumbs"
      :key="idx"
      itemprop="itemListElement"
      itemscope="itemscope"
      itemtype="https://schema.org/ListItem"
    >
      <nuxt-link
        v-if="bread.name !== ''"
        :to="{ name: bread.name, params: bread.params }"
        itemid="/"
        itemtype="https://schema.org/Thing"
        itemscope="itemscope"
        itemprop="item"
      >
        <span itemprop="name">{{ bread.linkName }}</span>
      </nuxt-link>
      <span v-else itemprop="name">{{ bread.linkName }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, getModule } from "nuxt-property-decorator";

import AppStore from "@/modules/Root/store/AppStore";

@Component
export default class BreadCrumbs extends Vue {
  get breadCrumbs() {
    return getModule(AppStore, this.$store).breadCrumbs;
  }

  get shouldShow() {
    return this.breadCrumbs.length >= 2;
  }
}
</script>

<style lang="scss">
.breadcrumbs {
  padding: 12px 0;

  &__list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    &::after {
      content: "/";
      font-size: 12px;
      color: #9495a6;
      padding: 0 3px;
    }

    &:last-child {
      &::after {
        display: none;
      }
    }
  }

  &__link,
  &__active {
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;
    color: #9495a6;
  }

  &__link {
    transition: all 0.5s ease;
    &:hover {
      color: #16192c;
    }
  }

  &__active {
    color: #16192c;
  }
}
</style>
