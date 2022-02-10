<template>
  <section v-if="!$fetchState.pending">
    <div class="mb-50 mt-30 order-detail">
      <nuxt-link to="/orders" class="mb-40 flex items-center">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.99316 9.9873L1.98621 5.98035L5.99316 1.97339" stroke="#16192C" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <span class="text-14 order-detail-back ml-7">Назад к списку заказов</span>
      </nuxt-link>
      <div class="mb-50 flex justify-between">
        <div>
          <div class="text-18 font-semibold">Заказ № {{ order.id }}</div>
          <div class="text-14 ordr-detail-date">Дата создания: {{ dateCreate }}</div>
        </div>
        <div class="order-detail-status">
          <div class="text-14 mb-3">{{ deliveryStatus }}</div>
          <div class="text-14">{{ paymentStatus }}</div>
        </div>
      </div>

      <div class="text-14 mb-5 grid grid-cols-4 gap-4 text-left">
        <div>
          <div class="mb-3 font-bold">Доставка по адресу</div>
          <div>{{ order.delivery_address }}</div>
        </div>
        <div>
          <div class="mb-3 font-bold">Оплата</div>
          <div>Здесь адрес</div>
        </div>
        <div>
          <div class="mb-3 font-bold">Доставка</div>
          <div>Здесь адрес</div>
        </div>
        <div>
          <div class="text-18 mb-27 flex justify-end font-bold">Итого: {{ totalPrice }}</div>
          <BaseButton class="repeat-order-btn">Повторить заказ</BaseButton>
        </div>
      </div>

      <div class="text-14 grid grid-cols-4 gap-4 text-left">
        <div>
          <div class="mb-3 font-bold">Получатель</div>
          <div>{{ order.first_name }} {{ order.patronymic }} {{ order.last_name }}</div>
          <div>{{ order.email }}</div>
          <div>{{ order.phone }}</div>
        </div>
        <div>
          <div class="mb-3 font-bold">Вес</div>
          <div>1 кг</div>
        </div>
        <div>
          <div class="mb-3 font-bold">Кол-во товаров</div>
          <div>{{ productCount }}</div>
        </div>
      </div>
    </div>
    <div v-for="iter in products" :key="iter.product.id" class="order-detail-product grid grid-cols-6 gap-6">
      <img
        v-lazysrc="productImageSrc(iter.product)"
        height="76"
        width="76"
        alt=" "
        class="object-scale-down pt-8 transition-all hover:scale-105"
      />
      <div>
        <div class="text-16 font-semibold">{{ iter.product.name }}</div>
        <div class="text-14">{{ productPrice(iter.product) }}</div>
      </div>
      <div>
        <img src="/images/header_heart.svg" width="20" height="18" class="cursor-pointer" alt="" />
        <!-- TODO @click="gotoFavor() -->
      </div>
      <div class="text-16">1 шт.</div>
      <div class="text-18 font-bold">2500 p.</div>
      <div class="text-14 font-semibold">Добавить в корзину</div>
    </div>
    <pre>{{ order }}</pre>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import dayjs from "dayjs";
import ExecutionOrderModel from "../models/ExecutionOrderModel";
import { ProfileService } from "../ProfileService";
import { decOfNum } from "@/utils/Formaters";
import ProductModel from "@/modules/Catalog/models/ProductModel";
import { CatalogService } from "@/modules/Catalog/CatalogService";

@Component
export default class OrderDetail extends Vue {
  order: ExecutionOrderModel = new ExecutionOrderModel();

  async fetch() {
    const id = parseInt(this.$route.params.id);
    this.order = await this.$serviceLocator.getService(ProfileService).getOrder(id);
  }

  get dateCreate() {
    return dayjs(this.order?.created_at).format("DD MMMM YYYY, HH:MM");
  }

  get totalPrice() {
    return `${this.order?.products_price.toLocaleString("ru-RU")} ₽`;
  }

  get productCount() {
    const count = this.order?.order_items_count || 0;
    return `${count} ${decOfNum(count, ["товар", "товара", "товаров"])}`;
  }

  get paymentStatus() {
    return this.order.payment_status;
  }

  get deliveryStatus() {
    return this.order?.delivery_status;
  }

  get products() {
    if (!!this.order?.order_items) {
      return this.order.order_items.filter((iter) => {
        return !!iter && !!iter.product;
      });
    }
    return [];
  }

  get deliveryStatusStyle() {
    return "";
  }

  productPrice(order: ProductModel) {
    return (order?.price?.toLocaleString() || 0) + " ₽";
  }

  productRouteLink(order: ProductModel) {
    return this.$serviceLocator.getService(CatalogService).getProductRouteLocation(order);
  }

  productImageSrc(order: ProductModel) {
    return order?.logo && order?.logo.length ? order.logo[0].url : "/images/product-no-photo.jpg";
  }
}
</script>

<style lang="scss" scoped>
.order-detail {
  &-back {
    color: $primary;
  }
  &-status {
    color: #4bc967;
  }
  &-vendor {
    color: $text-gray;
  }
  &-date {
    line-height: 36px;
  }
  &-product {
    border-top: solid 1px #e8e8e8;
    border-bottom: solid 1px #e8e8e8;
    padding: 20px 0;
  }
}
</style>
