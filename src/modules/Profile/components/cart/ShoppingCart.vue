<template>
  <div class="xl:px-40 h-full mt-7 shopping-cart">
    <div class="relative h-full">
      <div class="shopping-cart-title">
        <div class="flex items-end relative">
          <h2>Корзина</h2>
          <div class="shopping-cart-counter">3</div>
        </div>
        <button>Очистить</button>
      </div>
      <div class="mt-24 md:mt-42 flex flex-col h-full justify-between">
        <div class="flex flex-col pr-6 shopping-cart-items">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>

        <div class="w-full mt-40 mb-100">
          <div class="flex items-center justify-between text-14">
            <div>Общий вес</div>
            <div>200 г</div>
          </div>
          <div class="flex items-center justify-between mt-8 text-14">
            <div>НДС</div>
            <div>0 ₽</div>
          </div>
          <div class="flex items-center justify-between text-24 mt-25">
            <div>Итого</div>
            <div>2 000 ₽</div>
          </div>
          <BaseButton class="w-full mt-32" @click="gotoOrdering()">Перейти к оформлению</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class ShoppingCart extends Vue {
  gotoOrdering() {
    this.$emit("close");
    if (this.$route.name !== "ordering") {
      this.$router.push({ name: "ordering" });
    }
  }
}
</script>

<style lang="scss">
.shopping-cart {
  &-items {
    border-top: 1px solid #c9c9c9;

    max-height: calc(100% - 300px);
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #131313;
    }
    > .cart-item {
      border-bottom: 1px solid #c9c9c9;
    }
  }
  &-title {
    overflow: visible;
    padding-top: 2px;
    .cart-counter {
      @apply absolute flex items-center justify-center;
      background: $secondary;
      border-radius: 100px;
      color: #ffffff;
      font-size: 12px;
      line-height: 14px;
      top: -2px;
      right: -12px;
      width: 18px;
      height: 18px;
    }
    @apply flex items-end;
    > h2 {
      font-size: 24px;
      line-height: 29px;
    }
    > button {
      font-size: 14px;
      line-height: 17px;
      @apply text-gray-color mb-6 ml-32 outline-none;
    }
  }

  &-counter {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ef8532;
    border-radius: 100px;
    color: #fff;
    font-size: 12px;
    line-height: 14px;
    top: -2px;
    right: -12px;
    width: 18px;
    height: 18px;
  }
}
</style>
