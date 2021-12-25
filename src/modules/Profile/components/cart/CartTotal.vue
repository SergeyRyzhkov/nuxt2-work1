<template>
  <section class="cart-total w-full">
    <div class="flex items-center justify-between cart-info">
      <div>Общий вес</div>
      <div>200 г</div>
    </div>
    <div class="flex items-center justify-between mt-8 cart-info">
      <div>НДС</div>
      <div>0 ₽</div>
    </div>
    <div class="flex items-center justify-between cart-info-large">
      <div>Итого</div>
      <div>2 000 ₽</div>
    </div>
    <BaseButton class="w-full mt-32">Перейти к оформлению</BaseButton>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class CartTotal extends Vue {}
</script>

<style lang="scss">
.cart-total {
  padding-top: 16px;
  position: absolute;
  bottom: 0;
  .cart-info {
    font-size: 14px;
    line-height: 17px;
    &-large {
      @apply mt-25;
      font-size: 24px;
      line-height: 29px;
    }
  }
}
</style>
