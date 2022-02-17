<template>
  <section v-if="!$fetchState.pending" class="lg:w-4/5">
    <div class="mt-30 pb-50 border-b border-[#e8e8e8]">
      <nuxt-link :to="{ name: 'orders' }" class="mb-40 flex items-center">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.99316 9.9873L1.98621 5.98035L5.99316 1.97339" stroke="#16192C" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <span class="order-detail-back text-14 text-primary ml-7">Назад к списку заказов</span>
      </nuxt-link>
      <div class="mb-50 flex flex-col justify-between md:flex-row">
        <div>
          <div class="text-18 mb-8 font-semibold">Заказ № {{ order.id }}</div>
          <div class="text-14 mb-16 md:mb-0">Дата создания: {{ dateCreate }}</div>
        </div>
        <div class="border-b border-[#e8e8e8] pb-24 md:border-0 md:pb-0">
          <div class="text-14 mb-3">{{ status }}</div>
          <div class="text-14">{{ paymentStatus }}</div>
        </div>
      </div>

      <div class="text-14 mb-24 grid grid-cols-1 gap-6 text-left md:grid-cols-3 lg:grid-cols-4">
        <div>
          <div class="mb-6 font-semibold">Доставка по адресу</div>
          <div class="md:mb-5">{{ order.delivery_address }}</div>
        </div>
        <div>
          <div class="mb-6 font-semibold">Оплата</div>
          <div class="md:mb-5">{{ paymentType }}</div>
        </div>
        <div>
          <div class="mb-6 font-semibold">Доставка</div>
          <div class="md:mb-5">{{ deliveryPrice }}</div>
        </div>

        <div class="order-detail-total-top hidden lg:block">
          <div class="mb-27 text-18 flex justify-end font-semibold">Итого: {{ totalPrice }}</div>
          <BaseButton v-if="repeatOrderEnabled" class="w-280 flex flex-col" @click="repeatOrder(order)"
            >Повторить заказ</BaseButton
          >
        </div>
      </div>

      <div class="text-14 grid grid-cols-1 gap-4 text-left md:grid-cols-3 lg:grid-cols-4">
        <div class="md:mb-5">
          <div class="mb-6 font-semibold">Получатель</div>
          <div class="mb-6">{{ order.first_name }} {{ order.patronymic }} {{ order.last_name }}</div>
          <div class="mb-6">{{ order.email }}</div>
          <div class="mb-6">{{ order.phone }}</div>
        </div>
        <div class="mb-16 md:mb-5">
          <div class="mb-6 font-semibold">Вес</div>
          <div>{{ allWeight }} г</div>
        </div>
        <div class="mb-6 md:mb-5">
          <div class="mb-15 font-semibold">Кол-во товаров</div>
          <div>{{ totalItems }}</div>
        </div>
      </div>
    </div>

    <div
      v-for="iter in products"
      :key="iter.product.id"
      class="order-detail-product grid grid-cols-6 items-center gap-6 border-b border-[#e8e8e8] py-20"
    >
      <nuxt-link :to="routeLocation(iter.product.id)" class="order-detail-img h-76">
        <img v-lazysrc="productImageSrc(iter.product)" height="76" width="76" alt=" " class="object-scale-down pt-8" />
      </nuxt-link>

      <div>
        <nuxt-link :to="routeLocation(iter.product.id)">
          <div class="text-16 mb-8 font-semibold">{{ iter.product.name }}</div>
        </nuxt-link>
        <div class="text-14 text-text-gray hidden md:flex">Артикул {{ iter.product.vendor_code }}</div>
      </div>

      <BaseHeartButton
        class="hidden cursor-pointer justify-self-center md:flex"
        :is-red="iter.product.is_favorite"
      ></BaseHeartButton>
      <div class="text-16">{{ iter.count }} шт.</div>
      <div class="text-18 font-semibold">{{ productPrice(iter.product) }}</div>
      <div class="text-14 hidden cursor-pointer lg:flex" @click.prevent="addToBasket(iter)">Добавить в корзину</div>
    </div>

    <div class="mt-30 flex flex-col lg:hidden">
      <div class="mb-27 text-18 font-semibold">Итого: {{ totalPrice }}</div>
      <BaseButton v-if="repeatOrderEnabled" class="repeat-order-btn w-280" @click="repeatOrder(order)"
        >Повторить заказ</BaseButton
      >
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
import CartModel from "../models/CartModel";
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

  routeLocation(id: number) {
    return {
      name: "product",
      params: { slug: `${id}` },
    };
  }

  get dateCreate() {
    return dayjs(this.order?.created_at).format("DD MMMM YYYY, HH:MM");
  }

  get totalPrice() {
    const price = Number(this.order?.products_price);
    return `${price?.toLocaleString("ru-RU")} ₽`;
  }

  get totalItems() {
    return this.products.map((iter: any) => iter.count).reduce((prev, curr) => prev + curr, 0);
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

  get deliveryPrice() {
    const price = this.order.delivery_price;
    if (price === 0) return `Бесплатно`;
    return price;
  }

  get paymentType() {
    const payment = this.order.payment_type;
    if (payment === "cash") return `Наличными при получении`;
    if (payment === "card") return `Банковской картой на сайте`;
    if (payment === "invoice") return `Выставление счета`;
  }

  get cartItems() {
    return getModule(CartStore, this.$store).userCart;
  }

  get allWeight() {
    return this.products
      .reduce((sum, iterCart) => sum + (iterCart.product.weight || 0) * iterCart.count, 0)
      .toLocaleString("ru-RU");
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

  async repeatOrder(order: ExecutionOrderModel) {
    await this.$serviceLocator.getService(ProfileService).repeatOrder(order);
    this.$modalManager.showNotify("Добавлено. Можете оформить заказ!");
  }

  async addToBasket(product: CartModel) {
    await this.$serviceLocator.getService(ProfileService).addToCart(product.product_id, product.count);
    this.$modalManager.showNotify("Добавлено. Можете оформить заказ!");
  }
}
</script>

<style lang="scss" scoped>
.order-detail {
  &-img {
    @media (max-width: 1024px) {
      grid-row: 1/4;
    }
  }
  &-product {
    @media (max-width: 768px) {
      grid-template-columns: 1fr 3fr;
    }
  }
}
</style>
