<template>
  <div class="order-item mb-25">
    <div class="order-item-header flex flex-col justify-between px-20 pt-16 pb-12 md:flex-row md:items-center">
      <div class="flex flex-col md:flex-row md:items-center">
        <div>
          <div class="order-item-id">Заказ №: <span class="font-semibold">12233445667</span></div>
          <div class="order-item-date">Дата создания: 25 июля 2021, 19:30</div>
        </div>
        <div class="order-item-status md:pl-67">В обработке</div>
      </div>
      <div class="mt-5 flex flex-row justify-between md:mt-0 md:flex-col">
        <div class="order-item-price">3 700 ₽</div>
        <div class="order-item-count">3 товара</div>
      </div>
    </div>
    <div class="order-item-body">
      <div class="order-item-info flex items-center justify-between">
        <div>Ожидается оплата</div>
        <div class="underline">Подробнее</div>
      </div>
      <div class="mt-24 flex flex-col md:flex-row md:justify-between">
        <div class="order-item-products flex items-center">
          <div class="ml-8 flex max-w-[95px] flex-col first:ml-0 lg:max-w-[132px]">
            <figure class="order-item-product-image">
              <img src="/images/tmp_product.jpg" alt="" itemprop="image" class="" loading="lazy" />
              <figcaption></figcaption>
            </figure>
            <div class="order-item-product-title mt-8 md:mt-12">Маска KAYPRO Botu-Cure</div>
            <div class="order-item-product-price mt-6">2 000 ₽</div>
          </div>
          <div class="ml-8 flex max-w-[95px] flex-col lg:max-w-[132px]">
            <figure class="order-item-product-image">
              <img src="/images/tmp_product.jpg" alt="" itemprop="image" class="" loading="lazy" />
              <figcaption></figcaption>
            </figure>
            <div class="order-item-product-title mt-12">Маска KAYPRO Botu-Cure</div>
            <div class="order-item-product-price mt-6">2 000 ₽</div>
          </div>
        </div>
        <div class="order-item-pay mt-21 flex flex-col items-center md:mt-0 md:items-end">
          <div>
            <BaseButton class="order-item-btn">Оплатить заказ</BaseButton>
          </div>
          <div class="order-item-pay-cancel mt-16">Отменить заказ</div>
          <div class="order-item-pay-info mt-12 text-center md:text-right">
            Не прошла оплата-онлайн, повторите попытку или заказ будет отменен через 00:29 минут
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
@Component({
  components: {},
})
export default class OrderItem extends Vue {}
</script>

<style lang="scss">
.order-item {
  border: 1px solid #e8e8e8;
  &-btn {
    padding: 12px 34px !important;
    font-size: 12px !important;
  }
  &-pay {
    @include widescreen {
      max-width: 40%;
    }
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
    font-weight: bold;
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
