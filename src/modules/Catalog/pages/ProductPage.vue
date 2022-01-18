<template>
  <main class="page-wrapper">
    <div class="container">
      <BreadCrumbs />
      <section class="flex flex-col md:flex-row md:items-start">
        <div class="md:w-1/2 lg:w-7/12"></div>
        <div class="lg:w-5/12 md:w-1/2">
          <div class="text-[#4BC967] text-14 block md:hidden">В наличии на складе</div>
          <h2 class="text-24 font-semibold">{{ model.name }}</h2>
          <div class="text-gray-color mt-16 text-14">Артикул: {{ model.vendor_code }}</div>
          <div class="mt-32">
            <div class="flex flex-row md:flex-col items-center md:items-start justify-between">
              <div class="text-28 font-semibold">{{ model.price }} ₽</div>
              <div class="md:mt-32 flex items-center">
                <div class="flex items-center">
                  <BaseButton class="rounded-full w-36 h-36 border-counter" :padding-empty="true" :class="{disabled: productCount === 1}" @click="productCounter(productCount - 1)"
                    ><span class="text-28 font-normal">
                       <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect y="0.956543" width="12" height="2.08696" rx="1.04348" fill="#131313" />
                       </svg>
                  </span>
                  </BaseButton>
                  <div class="text-14 mx-12"> {{ productCount }}</div>
                  <BaseButton class="rounded-full w-36 h-36 border-counter" :padding-empty="true" @click="productCounter(productCount + 1)"
                    ><span class="text-28 font-normal">
                         <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="5.95654" width="12" height="2.08696" rx="1.04348" fill="#131313" />
                            <rect x="7" y="0.739258" width="12.5217" height="2" rx="1" transform="rotate(90 7 0.739258)" fill="#131313" />
                        </svg>
                  </span></BaseButton
                  >
                </div>
                <div class="text-[#4BC967] ml-24 text-14 hidden md:block">В наличии на складе</div>
              </div>
            </div>
            <div class="mt-32 flex items-center justify-between md:justify-start">
              <BaseButton @click="addToCart">Добавить в корзину</BaseButton>
              <BaseHeartButton
                class="ml-14 rounded-full flex items-cenetr justify-center w-52 h-52 border border-primary"
                :is-red="false"
                @click.prevent="add2Favor()"
              ></BaseHeartButton>
            </div>
          </div>
          <div class="mt-32">
            <div class="text-16 font-semibold">Доставка</div>
            <div class="flex items-center mt-18">
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1 5.25L9.5 9.5V18L1 13.75V5.25Z"
                  stroke="#131313"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18 5.25L9.5 9.5V18L18 13.75V5.25Z"
                  stroke="#131313"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.5 1L18 5.25L9.5 9.5L1 5.25L9.5 1Z"
                  stroke="#131313"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.25 3.125L13.75 7.375V10.775"
                  stroke="#131313"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="ml-12 text-14">в <span class="text-secondary">Москву</span> бесплатно</div>
            </div>
            <div class="text-gray-color mt-16 text-12">
              Цена действительна только для интернет-магазина и может отличаться от цен в розничных магазинах
            </div>
          </div>
          <div class="mt-32 p-24 bg-nude rounded-[20px]">
            <div class="text-14 font-semibold">
              Доставка до двери по Москве - на следующий рабочий день. При заказе от 3000 рублей - бесплатно!
            </div>
            <div class="text-12 mt-8">
              Для заказов по Москве доступна бесплатная доставка курьерами фирмы при заказе от 3000 рублей. Желаем приятных
              покупок!
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="bg-nude container-fluid">
      <div class="container">
        <div class="md:w-1/2 lg:w-7/12 mt-40 md:mt-60 py-32 md:py-64">
          <BaseAccordion>
            <template #header>
              <span class="font-semibold">Описание</span>
            </template>
            <template #content>
              <LazyHydrate never>
                <div class="text-14">{{ model.full_description }}</div>
              </LazyHydrate>
            </template>
          </BaseAccordion>
          <BaseAccordion>
            <template #header>
              <span class="font-semibold">Характеристики</span>
            </template>
            <template #content>
              <LazyHydrate never>
                <div class="text-14">{{ model.characteristic }}</div></LazyHydrate
              >
            </template>
          </BaseAccordion>
          <BaseAccordion>
            <template #header>
              <span class="font-semibold">Состав</span>
            </template>
            <template #content
              ><LazyHydrate never
                ><div class="text-14">{{ model.composition }}</div></LazyHydrate
              ></template
            >
          </BaseAccordion>
        </div>
      </div>
    </section>

    <section v-if="!!popular" class="mt-40 md:mt-60 container">
      <h2 class="text-42 font-compact uppercase">Рекомендуем</h2>
      <LazyHydrate when-visible>
        <LazyBaseSwiper :slides="popular" class="mt-32" :settings="sliderSettings">
          <template #slide="{ slide }">
            <ProductItem :model="slide" class="w-max"></ProductItem>
          </template>
        </LazyBaseSwiper>
      </LazyHydrate>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue } from "nuxt-property-decorator";
import LazyHydrate from "vue-lazy-hydration";
import { CatalogService } from "../CatalogService";
import ProductModel from "../models/ProductModel";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";
import { ProfileService } from "@/modules/Profile/ProfileService";

@Component({
  components: {
    LazyHydrate,
  },
})
export default class ProductPage extends Vue {
  @Prop()
  slug: string;

  productCount: number = 1;
  model: ProductModel = new ProductModel();

  async fetch() {
    this.model = await this.$serviceLocator.getService(CatalogService).getProduct(this.slug);
    this.updateBreadCrumbs();
  }

  addToCart(){
    this.$serviceLocator.getService(ProfileService).AddToCart(this.model.id, this.productCount);
  }

  productCounter(count: number) {
    if (count < 1){
      return;
    }
    this.productCount = count;
  }


  get popular() {
    // return null;
    return this.$serviceLocator.getService(ProfileService).getFavorites();
  }

  get sliderSettings() {
    return {
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    };
  }

  add2Favor() {}

  head() {
    if (!!this.model?.meta_slug) {
      this.model.meta_image =
        !!this.model.logo && this.model.logo.length ? this.model.logo[0].url : this.model.banner?.url || undefined;
    }
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.model, this.$route.fullPath);
  }

  updateBreadCrumbs() {
    const breadCrumbList = [
      { linkName: "Главная", name: "main" },
      { linkName: "Каталог", name: "catalog-root" },
      { linkName: this.model.category, name: this.model.category_slug },
      { linkName: `${this.model.title || this.model.meta_slug}` },
    ];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }
}
</script>
<style lang="scss">
.border-counter{
  border: 1px solid #c9c9c9 !important;
  &.disabled{
    pointer-events: none;
    svg {
      rect {
        fill: #c9c9c9;
      }
    }
  }
  &:hover {
    border: 1px solid transparent !important;
    svg {
      rect {
        fill: white;
      }
    }
  }
}
</style>
