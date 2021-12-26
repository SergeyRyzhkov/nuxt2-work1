<template>
  <main class="page-wrapper linear-order">
    <div class="container flex flex-col md:flex-row">
      <section class="w-full md:w-1/2 pt-60 line-half">
        <h1>Оформление заказа</h1>
        <BreadCrumbs />
        <OrderForm />
      </section>
      <section class="w-full xl:px-40 md:w-1/2 pt-60">
        <div class="flex flex-col shopping-cart-items">
          <CartItem :is-ordering="true" />
          <CartItem :is-ordering="true" />
          <CartItem :is-ordering="true" />
        </div>

        <div class="py-26">
          <div class="flex items-center justify-between text-14">
            <div>Общий вес</div>
            <div>200 г</div>
          </div>
          <div class="flex items-center justify-between mt-8 text-14">
            <div>Количество</div>
            <div>1</div>
          </div>
        </div>
        <div class="py-26 cost-border">
          <div class="flex items-center justify-between mt-8 text-14">
            <div>НДС</div>
            <div>0 ₽</div>
          </div>
          <div class="flex items-center justify-between mt-8 text-14">
            <div>Доставка</div>
            <div>0 ₽</div>
          </div>
          <div class="flex items-center justify-between mt-8 text-14">
            <div>Скидка</div>
            <div>0 ₽</div>
          </div>
        </div>

        <div class="flex items-center justify-between text-24 mt-25">
          <div>Итого</div>
          <div>2 000 ₽</div>
        </div>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import AppStore from "@/modules/Root/store/AppStore";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";

@Component
export default class OrderingPage extends Vue {
  fetch() {
    this.updateBreadCrumbs();
  }

  updateBreadCrumbs() {
    const breadCrumbList = [{ linkName: "Главная", name: "main" }, { linkName: "Корзина" }, { linkName: "Оформление заказа" }];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }
}
</script>

<style lang="scss">
.line-half {
  @include tablet {
    border-right: 0.5px solid #c9c9c9;
  }
}

.cost-border {
  border-bottom: 1px solid #c9c9c9;
  border-top: 1px solid #c9c9c9;
}

.linear-order {
  @include tablet {
    background: linear-gradient(90deg, rgba(255, 255, 255, 1) 50%, rgba(248, 248, 248, 1) 50%);
  }
}
</style>
