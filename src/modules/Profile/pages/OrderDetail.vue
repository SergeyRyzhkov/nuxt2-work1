<template>
  <section v-if="!$fetchState.pending" class="order-detail-container">
    <div class="mb-50 mt-30 order-detail">
      <nuxt-link :to="{ name: 'orders' }" class="mb-40 flex items-center">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.99316 9.9873L1.98621 5.98035L5.99316 1.97339" stroke="#16192C" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <span class="text-14 order-detail-back ml-7">Назад к списку заказов</span>
      </nuxt-link>
      <div class="mb-50 flex flex-col justify-between md:flex-row">
        <div>
          <div class="text-18 mb-8 font-semibold">Заказ № {{ order.id }}</div>
          <div class="text-14 ordr-detail-date mb-16 md:mb-0">Дата создания: {{ dateCreate }}</div>
        </div>
        <div class="order-detail-status pb-24 md:pb-0">
          <div class="text-14 mb-3">{{ status }}</div>
          <div class="text-14">{{ paymentStatus }}</div>
        </div>
      </div>

      <div class="text-14 grid grid-cols-1 gap-4 text-left md:grid-cols-3 lg:grid-cols-4">
        <div>
          <div class="mb-3 font-bold">Доставка по адресу</div>
          <div class="mb-16 md:mb-5">{{ order.delivery_address }}</div>
        </div>
        <div>
          <div class="mb-3 font-bold">Оплата</div>
          <div class="mb-16 md:mb-5">Здесь будет тип оплаты</div>
        </div>
        <div>
          <div class="mb-3 font-bold">Доставка</div>
          <div class="mb-16 md:mb-5">Бесплатно</div>
        </div>

        <div class="order-detail-total-top">
          <div class="text-18 mb-27 flex justify-end font-bold">Итого: {{ totalPrice }}</div>
          <BaseButton class="repeat-order-btn" @click="retryOrder()">Повторить заказ</BaseButton>
        </div>
      </div>

      <div class="text-14 grid grid-cols-1 items-center gap-4 text-left md:grid-cols-3 lg:grid-cols-4">
        <div class="mb-16 md:mb-5">
          <div class="mb-3 font-bold">Получатель</div>
          <div>{{ order.first_name }} {{ order.patronymic }} {{ order.last_name }}</div>
          <div>{{ order.email }}</div>
          <div>{{ order.phone }}</div>
        </div>
        <div class="mb-16 md:mb-5">
          <div class="mb-3 font-bold">Вес</div>
          <div>{{ allWeight }} г</div>
        </div>
        <div class="mb-16 md:mb-5">
          <div class="mb-3 font-bold">Кол-во товаров</div>
          <div>{{ productCount }}</div>
        </div>
      </div>
    </div>

    <div
      v-for="iter in products"
      :key="iter.product.id"
      class="order-detail-product mb-30 grid grid-cols-6 items-center gap-6 py-20"
    >
      <div class="order-detail-img">
        <img
          v-lazysrc="productImageSrc(iter.product)"
          height="76"
          width="76"
          alt=" "
          class="order-details-img object-scale-down pt-8 transition-all hover:scale-105"
        />
      </div>

      <div>
        <div class="text-16 mb-8 font-semibold">{{ iter.product.name }}</div>
        <div class="text-14 order-detail-vendor">Артикул {{ iter.product.vendor_code }}</div>
      </div>
      <BaseHeartButton class="heart-btn cursor-pointer justify-self-center" @click="gotoFavor()"></BaseHeartButton>
      <div class="text-16">1 шт.</div>
      <div class="text-18 font-bold">{{ productPrice(iter.product) }}</div>
      <div class="text-14 order-detail-add">Добавить в корзину</div>
    </div>

    <div class="md:flex md:flex-col lg:hidden">
      <div class="text-18 mb-27 font-bold">Итого: {{ totalPrice }}</div>
      <BaseButton class="repeat-order-btn sm:w-340 md:w-340" @click="retryOrder()">Повторить заказ</BaseButton>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, getModule, Vue } from "nuxt-property-decorator";
import dayjs from "dayjs";
import ExecutionOrderModel from "../models/ExecutionOrderModel";
import { ProfileService } from "../ProfileService";
import { OrderStatusType } from "../models/OredrStatusType";
import { PayStatusType } from "../models/PayStatusType";
import CartStore from "../store/CartStore";
import { decOfNum } from "@/utils/Formaters";
import ProductModel from "@/modules/Catalog/models/ProductModel";
import { CatalogService } from "@/modules/Catalog/CatalogService";
import { AuthService } from "@/modules/Auth/AuthService";

@Component
export default class OrderDetail extends Vue {
  order: ExecutionOrderModel = new ExecutionOrderModel();
  OrderStatusType = OrderStatusType;
  PayStatusType = PayStatusType;

  @Prop()
  id: number;

  async fetch() {
    this.order = await this.$serviceLocator.getService(ProfileService).getOrder(this.id);
  }

  get dateCreate() {
    return dayjs(this.order?.created_at).format("DD MMMM YYYY, HH:MM");
  }

  get totalPrice() {
    const price = Number(this.order?.products_price);
    return `${price?.toLocaleString("ru-RU")} ₽`;
  }

  get productCount() {
    const count = this.order?.order_items_count || 0;
    return `${count} ${decOfNum(count, ["товар", "товара", "товаров"])}`;
  }

  get paymentStatus() {
    return PayStatusType[this.order.payment_status];
  }

  get status() {
    return OrderStatusType[this.order?.status];
  }

  get products() {
    if (!!this.order?.order_items) {
      return this.order.order_items.filter((iter) => {
        return !!iter && !!iter.product;
      });
    }
    return [];
  }

  get cartItems() {
    return getModule(CartStore, this.$store).userCart;
  }

  get allWeight() {
    return this.cartItems
      .reduce((sum, iterCart) => sum + (iterCart.product.weight || 0) * iterCart.count, 0)
      .toLocaleString("ru-RU");
  }

  get allCount() {
    return this.cartItems.length;
  }

  productPrice(order: ProductModel) {
    const price = Number(order?.price);
    return (price?.toLocaleString("ru-RU") || 0) + " ₽";
  }

  productRouteLink(order: ProductModel) {
    return this.$serviceLocator.getService(CatalogService).getProductRouteLocation(order);
  }

  productImageSrc(order: ProductModel) {
    return order?.logo && order?.logo.length ? order.logo[0].url : "/images/product-no-photo.jpg";
  }

  get isAuthenticated() {
    return this.$serviceLocator.getService(AuthService).isAuthenticated;
  }

  get repeatOrderEnabled() {
    return this.$serviceLocator.getService(ProfileService).repeatOrderEnabled(this.order);
  }

  gotoFavor() {
    if (this.isAuthenticated) {
      if (this.$route.name !== "favorites") {
        this.$router.push({ name: "favorites" });
      }
    } else {
      this.$modalManager.showNotify("Войдите в свой аккаунт или зарегистрируйтесь !");
    }
  }

  retryOrder() {
    this.$emit("repeat-order", this.order);
  }
}
</script>

<style lang="scss" scoped>
.order-detail {
  &-container {
    width: 80%;
    @media (min-width: 1024px) {
      width: 100%;
    }
  }
  &-back {
    color: $primary;
  }
  &-status {
    color: #4bc967;
    border-bottom: solid 1px #e8e8e8;
    @include mobile {
      border-bottom: none;
    }
  }
  &-add {
    display: none;
    @media (min-width: 1024px) {
      display: flex;
    }
  }
  &-vendor {
    color: $text-gray;
    display: none;
    @media (min-width: 1024px) {
      display: flex;
    }
  }
  &-img {
    @media (max-width: 1024px) {
      grid-row: 1/4;
    }
  }
  &-date {
    line-height: 36px;
  }
  &-product {
    border-top: solid 1px #e8e8e8;
    border-bottom: solid 1px #e8e8e8;
    @media (max-width: 1024px) {
      grid-template-columns: 1fr 3fr;
    }
    @media (max-width: 768px) {
      grid-template-columns: 1fr 2fr;
    }
  }
  &-total {
    &-bottom {
      @media (min-width: 1023px) {
        display: none;
      }
    }
    &-top {
      display: none;
      @media (min-width: 1024px) {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
.heart-btn {
  display: none;
  @media (min-width: 1024px) {
    display: flex;
  }
}
</style>
