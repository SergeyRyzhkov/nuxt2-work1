<template>
  <section class="cart-total w-full">
    <div :class="{ 'order-total': isOrdering }">
      <div class="cart-info flex items-center justify-between">
        <div>Общий вес</div>
        <div>200 г</div>
      </div>
      <div v-if="isOrdering" class="cart-info mt-8 flex items-center justify-between">
        <div>Количество</div>
        <div>1</div>
      </div>
    </div>
    <div :class="{ 'order-total': isOrdering }">
      <div class="cart-info mt-8 flex items-center justify-between">
        <div>НДС</div>
        <div>0 ₽</div>
      </div>
      <div v-if="isOrdering" class="cart-info mt-8 flex items-center justify-between">
        <div>Доставка</div>
        <div>0 ₽</div>
      </div>
      <div v-if="isOrdering" class="cart-info mt-8 flex items-center justify-between">
        <div>Скидка</div>
        <div>0 ₽</div>
      </div>
    </div>

    <div class="cart-info-large flex items-center justify-between">
      <div>Итого</div>
      <div>2 000 ₽</div>
    </div>
    <BaseButton class="mt-32 w-full" :class="{ 'lg:hidden': isOrdering }">{{
      isOrdering ? "Оформить" : "Перейти к оформлению"
    }}</BaseButton>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class CartTotal extends Vue {
  @Prop({ default: false })
  isOrdering: boolean;
}
</script>

<style lang="scss">
.order-total {
  @apply py-26;
  border-bottom: 1px solid #c9c9c9;
  margin-top: -16px;
}
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
