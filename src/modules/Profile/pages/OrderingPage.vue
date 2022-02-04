<template>
  <main class="page-wrapper linear-order">
    <div class="container flex flex-col md:flex-row">
      <section class="line-half w-full pt-60 md:w-1/2">
        <h1>Оформление заказа</h1>
        <BreadCrumbs />
        <OrderForm :order="order" :delivery-methods="deliveryMethods" :payment-types="paymentTypes" />
      </section>
      <section class="max-h-[75vh] w-full pt-60 md:w-1/2 xl:pl-40">
        <div class="shopping-cart-items flex flex-col">
          <CartItem v-for="iter in cartItems" :key="iter.id" :cart-item="iter" :is-ordering="true" />
        </div>

        <div class="py-26">
          <div class="text-14 flex items-center justify-between">
            <div>Общий вес</div>
            <div>{{ allWeight }} г.</div>
          </div>
          <div class="text-14 mt-8 flex items-center justify-between">
            <div>Количество</div>
            <div>{{ allCount }} шт.</div>
          </div>
        </div>
        <div class="cost-border py-26">
          <!-- <div class="text-14 mt-8 flex items-center justify-between">
            <div>НДС</div>
            <div>0 ₽</div>
          </div> -->
          <div class="text-14 mt-8 flex items-center justify-between">
            <div>Доставка</div>
            <div>{{ deliverySum }}</div>
          </div>
          <div v-if="!!discountSum" class="text-14 mt-8 flex items-center justify-between">
            <div>Скидка</div>
            <div>{{ discountSum }} ₽</div>
          </div>
        </div>

        <div class="mt-25 text-24 flex items-center justify-between">
          <div>Итого</div>
          <div>{{ price }}</div>
        </div>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import OrderModel from "../models/OrderModel";
import { ProfileService } from "../ProfileService";
import CartModel from "../models/CartModel";
import AppStore from "@/modules/Root/store/AppStore";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";

@Component
export default class OrderingPage extends Vue {
  order = new OrderModel();
  deliveryMethods: { id: number; title: string; price: number; free_from: any }[] = [];
  paymentTypes: { id: number; title: string }[] = [];
  cartItems: CartModel[] = [];

  fetch() {
    this.updateBreadCrumbs();
    this.deliveryMethods = this.$serviceLocator.getService(ProfileService).getDeliveryMethods();
    this.paymentTypes = this.$serviceLocator.getService(ProfileService).getPaymentMethods();
    this.cartItems = this.$serviceLocator.getService(ProfileService).getCartItems();
  }

  get allWeight() {
    return this.cartItems
      .reduce((sum, iterCart) => sum + (iterCart.product.weight || 0) * iterCart.count, 0)
      .toLocaleString("ru-RU");
  }

  get allCount() {
    return this.cartItems.length;
  }

  get deliverySumNmb() {
    if (this.cartItems.length > 0 && this.deliveryMethods.length > 0) {
      const method = this.deliveryMethods.find((iter) => iter.id === this.order.delivery_method_id);
      if (!!method) {
        return method.free_from > this.priceNmb ? method.price : 0;
      }
    }
    return 0;
  }

  get deliverySum() {
    return this.deliverySumNmb.toLocaleString("ru-RU") + " ₽";
  }

  get discountSum() {
    return 0;
  }

  get price() {
    return (this.priceNmb + this.deliverySumNmb - this.discountSum).toLocaleString("ru-RU") + " ₽";
  }

  get priceNmb() {
    return this.cartItems.reduce((sum, iterCart) => sum + (iterCart.product.price || 0) * iterCart.count, 0);
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
