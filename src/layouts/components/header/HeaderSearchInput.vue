<template>
  <div v-click-outside="closeDropDown" class="w-full">
    <BaseInput v-model="search"  placeholder="Искать товар" @keyup.enter="searchProducts" @focus="focused = true" classes="header-search-input">
      <svg
        @click="searchProducts"
        class="header-search-input__icon"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10.4298" cy="11" r="6.575" transform="rotate(-45 10.4298 11)" stroke="#16192C" stroke-width="1.6" />
        <path d="M15.1144 15.6846L18.9151 19.4853" stroke="#16192C" stroke-width="1.6" />
      </svg>
      <div  class="header-search-input-dropdown hidden lg:block" v-if="products !== null && focused && search.length > strLength">
        <div class="dropdown-no-results" v-if="products !== null && products.length === 0">
          <div class="request-string">По запросу "{{ search }}"</div>
          <div class="no-results">Нет результатов</div>
        </div>
        <div class="dropdown-results flex-wrap justify-between flex" v-if="products !== null && products.length > 0">
          <nuxt-link :to="routeLink(product)" v-for="(product, index) in products" :key="index" class="flex items-center">
            <figure class="dropdown-img">
              <img :src="product.logo[0].url" :alt="product.meta_title" itemprop="image" width="78" height="78" loading="lazy" />
              <figcaption></figcaption>
            </figure>
            <div class="pl-20 item-title">{{ product.meta_title }}</div>
          </nuxt-link>
        </div>
      </div>
      <div v-if="products !== null && focused && search.length > strLength"  class="dark hidden lg:block" @click="closeDropDown"></div>
    </BaseInput>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import {CatalogService} from "@/modules/Catalog/CatalogService";
import ProductModel from "@/modules/Catalog/models/ProductModel";

@Component
export default class HeaderSearchInput extends Vue {
  search: string = "";
  focused: boolean = false;
  products: null | ProductModel[] = null;
  strLength: number = 3;

  @Watch('$route.path')
  watchRoute(){
    this.closeDropDown()
  }

   routeLink(product) {
    return this.$serviceLocator.getService(CatalogService).getProductRouteLocation(product);
  }
  closeDropDown(){
     this.focused = false
  }

  async searchProducts() {
    if (this.search.length > this.strLength) {
      this.products = await this.$serviceLocator.getService(CatalogService).getSearchProducts('', this.search)
    }
  }
}
</script>

<style lang="scss">
.dropdown-no-results {
  .request-string {
    font-size: 14px;
    line-height: 22px;
  }
  .no-results {
    color: $text-gray;
    font-size: 14px;
    line-height: 22px;
  }
}
.dark {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.3;
  background: $primary;
}
.header-search-input {
  border-radius: 9999px !important;
  height: 46px;
  position: relative;
  padding: 8px 23px 8px 23px;
  border: 1px solid #dfdfdf !important;
  &-dropdown {
    border-top: 2px solid $primary;
    position: absolute;
    height: auto;
    width: 100%;
    background: #ffffff;
    top: 62px;
    z-index: 1000;
    @apply px-22 pt-24 pb-26;
    .dropdown-img {
      width: 78px;
      height: 78px;
    }
    .dropdown-results {
      > a {
        width: calc(50% - 24px);
        font-weight: normal;
        cursor: pointer;
        > figure {
          img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
        }
      }
      > a {
        margin-bottom: 16px;
      }
    }
    .item-title {
      font-size: 14px;
      line-height: 17px;
    }
  }
  &__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 14px;
  }
}
</style>
