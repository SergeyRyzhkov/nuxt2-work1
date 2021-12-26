<template>
  <div class="order-item mb-25">
    <div class="order-item-header">
      <div class="flex items-center">
        <div>
          <div class="order-item-id">Заказ №: <span class="font-bold">12233445667</span></div>
          <div class="order-item-date">Дата создания: 25 июля 2021, 19:30</div>
        </div>
        <div class="pl-67 order-item-status">В обработке</div>
      </div>
      <div>
        <div class="order-item-price">3 700 ₽</div>
        <div class="order-item-count">3 товара</div>
      </div>
    </div>
    <div class="order-item-body">
      <div class="order-item-info flex justify-between items-center">
        <div>Ожидается оплата</div>
        <div class="underline">Подробнее</div>
      </div>
      <div class="mt-24 flex justify-between">
        <div class="flex items-center order-item-products">
          <div class="first:ml-0 ml-8 flex flex-col">
            <figure class="order-item-product-image">
              <img src="/images/tmp_product.jpg" alt="" itemprop="image" class="" loading="lazy" />
              <figcaption></figcaption>
            </figure>
            <div class="order-item-product-title mt-12">Маска KAYPRO Botu-Cure</div>
            <div class="order-item-product-price mt-6">2 000 ₽</div>
          </div>
          <div class="ml-8 flex flex-col">
            <figure class="order-item-product-image">
              <img src="/images/tmp_product.jpg" alt="" itemprop="image" class="" loading="lazy" />
              <figcaption></figcaption>
            </figure>
            <div class="order-item-product-title mt-12">Маска KAYPRO Botu-Cure</div>
            <div class="order-item-product-price mt-6">2 000 ₽</div>
          </div>
        </div>
        <div class="flex flex-col items-end order-item-pay">
          <div>
            <BaseButton>Оплатить заказ</BaseButton>
          </div>
          <div class="mt-16 order-item-pay-cancel">Отменить заказ</div>
          <div class="mt-12 order-item-pay-info">
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

  &-pay {
    max-width: 336px;
    &-cancel {
      font-size: 12px;
      line-height: 24px;
      color: #ff1220;
    }
    &-info {
      font-size: 12px;
      line-height: 20px;
      text-align: right;
      color: $text-gray;
    }
  }
  &-product {
    width: 133px;
    &-image {
      width: 133px;
      height: 158px;
    }
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
    @apply pt-24 pb-20 px-21;
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
    @apply flex flex-col md:flex-row items-center justify-between px-20 pt-16 pb-12;
    background: #f6f6f6;
  }
}
</style>
