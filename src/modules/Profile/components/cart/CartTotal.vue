<template>
  <section class="cart-total w-full">
    <div :class="{ 'order-total': isOrdering }">
      <div class="flex items-center justify-between cart-info">
        <div>Общий вес</div>
        <div>200 г</div>
      </div>
      <div v-if="isOrdering" class="flex items-center justify-between mt-8 cart-info">
        <div>Количество</div>
        <div>1</div>
      </div>
    </div>
    <div :class="{ 'order-total': isOrdering }">
      <div class="flex items-center justify-between mt-8 cart-info">
        <div>НДС</div>
        <div>0 ₽</div>
      </div>
      <div class="flex items-center justify-between mt-8 cart-info">
        <div>Доставка</div>
        <div>0 ₽</div>
      </div>
      <div class="flex items-center justify-between mt-8 cart-info">
        <div>Скидка</div>
        <div>0 ₽</div>
      </div>
    </div>

    <div class="flex items-center justify-between cart-info-large">
      <div>Итого</div>
      <div>2 000 ₽</div>
    </div>
    <BaseButton v-if="!isOrdering" class="w-full mt-32">Перейти к оформлению</BaseButton>
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
