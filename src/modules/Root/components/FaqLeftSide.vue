<template>
  <ul v-show="!!faqModel" class="faq-menu-list">
    <li v-for="(item, index) in faqModel.content.context" :key="index" :class="activeClass(item)" @click="onClick(item)">
      {{ item.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import FaqModel from "../models/FaqModel";

@Component
export default class FaqLeftSide extends Vue {
  @Prop()
  faqModel: FaqModel;

  @Prop()
  selectedFaq;

  onClick(item: { title: string; description: string }) {
    this.$emit("select-item", item);
  }

  activeClass(item: { title: string; description: string }) {
    if (item.title === this.selectedFaq?.title) {
      return "active";
    }
  }
}
</script>

<style lang="scss">
.faq-menu-list {
  display: inline-block;
  li {
    font-size: 14px;
    width: auto;
    // color: #9495a6;
    line-height: 2em;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: $secondary;
    }
    &.active {
      color: $secondary;
    }
  }
}
</style>
