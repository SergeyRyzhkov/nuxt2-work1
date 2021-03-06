<template>
  <div class="order-item mb-25">
    <div class="order-item-header flex flex-col justify-between px-20 pt-16 pb-12 md:flex-row md:items-center">
      <div class="flex flex-col md:flex-row md:items-center">
        <div>
          <div class="order-item-id">
            Заказ №: <span class="font-semibold">{{ model.id }}</span>
          </div>
          <div class="order-item-date">Дата создания: {{ dateCreate }}</div>
        </div>
        <div class="order-item-status md:pl-67">{{ status }}</div>
      </div>
      <div class="mt-5 flex flex-row justify-between md:mt-0 md:flex-col">
        <div class="order-item-price">{{ totalPrice }}</div>
        <div class="order-item-count">{{ productCount }}</div>
      </div>
    </div>
    <div class="order-item-body">
      <div class="order-item-info flex items-center justify-between">
        <div>{{ paymentStatus }}</div>
        <nuxt-link :to="routeLocation" class="cursor-pointer underline hover:no-underline">Подробнее</nuxt-link>
      </div>
      <div class="flex flex-col lg:flex-row">
        <div
          class="order-item-products mt-16 flex w-full min-w-[96px] flex-wrap md:justify-between lg:mt-24 lg:w-2/3 lg:min-w-[133px]"
        >
          <div v-for="iter in products" :key="iter.product.id" class="mr-8">
            <nuxt-link :to="productRouteLink(iter.product)">
              <img
                v-lazysrc="productImageSrc(iter.product)"
                height="158"
                width="133"
                alt=" "
                class="h-100 px-30 lg:h-158 lg:w-133 w-96 object-scale-down pt-8 lg:pt-12"
              />
              <div class="text-12 lg:text-14 mt-8 md:mt-12">{{ iter.product.name }}</div>
              <div class="text-14 mt-8 font-semibold">{{ productPrice(iter.product) }}</div>
            </nuxt-link>
          </div>
        </div>
        <div class="order-item-pay mt-16 flex w-full flex-col items-center md:mt-0 md:items-end lg:mt-24 lg:w-1/3">
          <BaseButton v-if="payOrderEnabled" class="order-item-btn w-full lg:max-w-max">Оплатить заказ</BaseButton>
          <BaseButton v-if="repeatOrderEnabled" class="order-item-btn w-full lg:max-w-max" @click="retryOrder()"
            >Повторить заказ</BaseButton
          >
          <div v-if="cancelOrderEnabled" class="order-item-pay-cancel mt-16 cursor-pointer" @click="cancelOrder()">
            Отменить заказ
          </div>
          <!-- <div class="order-item-pay-info mt-12 text-center md:text-right">
            Не прошла оплата-онлайн, повторите попытку или заказ будет отменен через 00:29 минут
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Component, Prop, Vue } from "nuxt-property-decorator";
import ExecutionOrderModel from "../models/ExecutionOrderModel";
import { OrderStatusType } from "../models/OredrStatusType";
import { ProfileService } from "../ProfileService";
import { PayStatusType } from "../models/PayStatusType";
import { decOfNum } from "@/utils/Formaters";
import ProductModel from "@/modules/Catalog/models/ProductModel";
import { CatalogService } from "@/modules/Catalog/CatalogService";

@Component
export default class OrderItem extends Vue {
  OrderStatusType = OrderStatusType;
  PayStatusType = PayStatusType;

  @Prop()
  model: ExecutionOrderModel;

  get routeLocation() {
    return {
      name: "order-detail",
      params: { id: this.model.id },
    };
  }

  get dateCreate() {
    return dayjs(this.model?.created_at).format("DD MMMM YYYY, HH:MM");
  }

  get totalPrice() {
    const price = Number(this.model?.products_price);
    return `${price?.toLocaleString("ru-RU")} ₽`;
  }

  get productCount() {
    const count = this.model?.order_items_count || 0;
    return `${count} ${decOfNum(count, ["товар", "товара", "товаров"])}`;
  }

  get paymentStatus() {
    return PayStatusType[this.model.payment_status];
  }

  get status() {
    return OrderStatusType[this.model?.status];
  }

  get products() {
    if (!!this.model?.order_items) {
      return this.model.order_items.filter((iter) => {
        return !!iter && !!iter.product;
      });
    }
    return [];
  }

  get cancelOrderEnabled() {
    return this.$serviceLocator.getService(ProfileService).cancelOrderEnabled(this.model);
  }

  get repeatOrderEnabled() {
    return this.$serviceLocator.getService(ProfileService).repeatOrderEnabled(this.model);
  }

  get payOrderEnabled() {
    return this.$serviceLocator.getService(ProfileService).payOrderEnabled(this.model);
  }

  get deliveryStatusStyle() {
    return "";
  }

  cancelOrder() {
    this.$emit("cancel-order", this.model);
  }

  retryOrder() {
    this.$emit("repeat-order", this.model);
  }

  productPrice(model: ProductModel) {
    const price = Number(model?.price);
    return (price?.toLocaleString("ru-RU") || 0) + " ₽";
  }

  productRouteLink(model: ProductModel) {
    return this.$serviceLocator.getService(CatalogService).getProductRouteLocation(model);
  }

  productImageSrc(model: ProductModel) {
    return model?.logo && model?.logo.length ? model.logo[0].url : "/images/product-no-photo.jpg";
  }
}
</script>

<style lang="scss">
.order-item {
  border: 1px solid #e8e8e8;
  &-btn {
    padding: 12px 34px !important;
    font-size: 12px !important;
  }
  &-pay {
    &-cancel {
      font-size: 12px;
      line-height: 24px;
      color: #ff1220;
    }
    &-info {
      font-size: 12px;
      line-height: 20px;
      color: $text-gray;
    }
  }
  &-product {
    &-title {
      font-size: 14px;
      line-height: 17px;
    }
    &-price {
      font-size: 14px;
      line-height: 17px;
      font-weight: bold;
    }
  }
  &-body {
    @apply px-21 pt-24 pb-20;
  }
  &-info {
    font-size: 12px;
    line-height: 24px;
  }
  &-status {
    font-size: 12px;
    line-height: 24px;
  }
  &-price {
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
  }
  &-count {
    font-size: 12px;
    line-height: 24px;
    color: $text-gray;
  }
  &-id {
    font-size: 14px;
    line-height: 24px;
  }
  &-date {
    font-size: 12px;
    line-height: 36px;
  }
  &-header {
    background: #f6f6f6;
  }
}
</style>
