<template>
  <section v-if="!!categories" class="product_category__wrapper">
    <div v-for="iter in categories" :key="iter.id" class="product_category">
      <div class="product_category__title" :class="[iter.isOpened ? 'active' : '']">
        <span @click="goToCategory(iter)">{{ iter.title }}</span>
        <BaseOpenCloseButton
          v-show="hasChildren(iter)"
          :class="[iter.isOpened ? 'active' : '']"
          width="14"
          height="14"
          :stroke="buttonStroke(iter)"
          @mouseover.native="hoveredCategoryModelId = iter.id"
          @mouseleave.native="hoveredCategoryModelId = 0"
          @click="toogle(iter)"
        ></BaseOpenCloseButton>
      </div>
      <div
        v-for="subCat in iter.subcategory"
        :key="subCat.id"
        class="product_category__content"
        :class="[iter.isOpened ? 'active' : '']"
      >
        <div class="product_category__sub">
          <span class="product_category__sub_title">{{ subCat.title }}</span>
          <span class="product_category__sub_subtitle">{{ subCat.subtitle }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { CatalogService } from "../CatalogService";
import CategoryModel from "../models/CategoryModel";

@Component
export default class CategoryCatalog extends Vue {
  @Prop()
  categories: CategoryModel[];

  hoveredCategoryModelId: number = 0;

  toogle(model: CategoryModel) {
    model.isOpened = !model.isOpened;
  }

  hasChildren(model: CategoryModel) {
    return !!model.subcategory && model.subcategory.length > 0;
  }

  buttonStroke(model: CategoryModel) {
    return model.id === this.hoveredCategoryModelId ? "white" : "#16192C";
  }

  goToCategory(model: CategoryModel) {
    const parms = this.$serviceLocator.getService(CatalogService).createCategoryRouteLocation(model);
    this.$router.push(parms);
  }
}
</script>

<style lang="scss">
.product_category__wrapper {
  .product_category__content {
    visibility: hidden;
    opacity: 0;
    height: 0;
    transition: all 0.2s ease-in-out;
    &.active {
      visibility: visible;
      opacity: 1;
      height: auto;
    }
    .product_category__sub {
      font-size: 14px;
      padding-top: 14px;
      .product_category__sub_title {
        font-weight: 600;
      }
      .product_category__sub_subtitle {
        color: $text-gray;
      }
    }
  }

  .product_category__title {
    > button {
      border: 1px solid $primary;
      padding: 5px;
      border-radius: 50%;
      transition: all 0.2s ease-in-out;
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
    margin-top: 20px;
  }
}
</style>
