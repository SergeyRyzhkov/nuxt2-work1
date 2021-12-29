<template>
  <section v-if="!$fetchState.pending" class="product_category__wrapper">
    <div v-for="iter in categories" :key="iter.id" class="product_category">
      <div class="product_category__title" :class="[iter.isOpened ? 'active' : '']" @click.stop="categoryClicked(iter)">
        <span>{{ iter.title }}</span>
        <BaseOpenCloseButton
          v-show="hasChildren(iter)"
          :class="[iter.isOpened ? 'active' : '']"
          width="14"
          height="14"
          :stroke="buttonStroke(iter)"
          @mouseover.native="hoveredCategoryModelId = iter.id"
          @mouseleave.native="hoveredCategoryModelId = 0"
          @click.stop="toogle(iter)"
        ></BaseOpenCloseButton>
      </div>

      <div
        v-for="subCat in iter.subcategory"
        :key="subCat.id"
        class="product_category__content"
        :class="[iter.isOpened ? 'active' : '']"
        @click.stop="categoryClicked(subCat)"
      >
        <div class="product_category__sub">
          <span class="product_category__sub_title">{{ subCat.title }}</span>
          <span class="product_category__sub_subtitle">{{ subCat.subtitle }}</span>
        </div>
      </div>
    </div>

    <!-- <div v-show="!!parentCategoryName" class="flex flex-col mt-32">
      <span>Категория</span>
      <button type="button" class="flex items-center mt-20" @click.stop="goBack">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.99316 9.9873L1.98621 5.98035L5.99316 1.97339" stroke="#16192C" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <div class="text-14 ml-6">{{ parentCategoryName }}</div>
      </button>
    </div> -->
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import CategoryModel from "../models/CategoryModel";

@Component
export default class CatalogNavigator extends Vue {
  categories: CategoryModel[] = [];

  hoveredCategoryModelId: number = 0;

  async fetch() {
    this.categories = await this.$serviceLocator.getService(CatalogService).getRoot();
  }

  // get parentCategoryName() {
  //   return this.selectedModel?.parent?.title;
  // }

  toogle(model: CategoryModel) {
    model.isOpened = !model.isOpened;
  }

  hasChildren(model: CategoryModel) {
    return !!model.subcategory && model.subcategory.length > 0;
  }

  buttonStroke(model: CategoryModel) {
    return model.id === this.hoveredCategoryModelId ? "white" : "#16192C";
  }

  categoryClicked(model: CategoryModel) {
    this.$emit("category-clicked", model);
  }

  goBack() {
    // if (this.model?.parent) {
    //   const parms = this.$serviceLocator.getService(CatalogService).getRouteLocation(this.model.parent);
    //   this.$router.push(parms);
    // }
  }
}
</script>

<style lang="scss">
.product_category__wrapper {
  .product_category__content {
    max-height: 0px;
    overflow-y: hidden;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      color: $secondary;
    }
    &.active {
      max-height: 300px;
    }
    .product_category__sub {
      font-size: 14px;
      padding-top: 14px;
      .product_category__sub_title {
        font-weight: 600;
      }
      .product_category__sub_subtitle {
        color: $text-gray;
        &:hover {
          color: $secondary;
        }
      }
    }
  }

  .product_category__title {
    cursor: pointer;
    > button {
      border: 1px solid $primary;
      padding: 5px;
      border-radius: 50%;
      transition: all 0.3s ease-in-out;
      &.active {
        transform: rotate(180deg);
      }
      &:hover {
        border-color: $secondary;
        background-color: $secondary;
      }
    }
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &.active {
      color: $secondary;
      font-weight: 600;
    }
    &:hover {
      color: $secondary;
    }
  }

  .product_category + .product_category {
    padding-top: 20px;
  }
}
</style>
