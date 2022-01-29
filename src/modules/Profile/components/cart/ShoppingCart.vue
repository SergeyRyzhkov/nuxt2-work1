<template>
  <div class="mt-7 shopping-cart h-full xl:px-40">
    <div class="relative h-full">
      <div class="shopping-cart-title">
        <div class="relative flex items-end">
          <h2>Корзина</h2>
          <div class="shopping-cart-counter">{{ cartItemsCount }}</div>
        </div>
        <button @click="clearCart()">Очистить</button>
      </div>
      <div class="mt-24 flex h-full flex-col justify-between md:mt-42">
        <div class="shopping-cart-items flex flex-col pr-6">
          <CartItem v-for="(item, index) in cartItems" :key="index" :cart-item="item" />
        </div>

        <div class="mt-40 mb-100 w-full">
          <div class="flex items-center justify-between text-14">
            <div>Общий вес</div>
            <div>{{ cartWeight }} г</div>
          </div>
          <div class="mt-8 flex items-center justify-between text-14">
            <div>НДС</div>
            <div>0 ₽</div>
          </div>
          <div class="mt-25 flex items-center justify-between text-24">
            <div>Итого</div>
            <div>{{ cartPrice }} ₽</div>
          </div>
          <BaseButton class="mt-32 w-full" @click="gotoOrdering()">Перейти к оформлению</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import { ProfileService } from "../../ProfileService";
import CartStore from "@/modules/Profile/store/CartStore";

@Component
export default class ShoppingCart extends Vue {
  gotoOrdering() {
    this.$emit("close");
    if (this.$route.name !== "ordering") {
      this.$router.push({ name: "ordering" });
    }
  }

  get cartItems() {
    return getModule(CartStore, this.$store).userCart;
  }

  get cartPrice() {
    const sum = this.cartItems.reduce((sum, iterCart) => sum + (iterCart.product.price || 0) * iterCart.count, 0);
    return sum.toLocaleString("ru-RU");
  }

  get cartWeight() {
    const sum = this.cartItems.reduce((sum, iterCart) => sum + (iterCart.product.weight || 0) * iterCart.count, 0);
    return sum.toLocaleString("ru-RU");
  }

  get cartItemsCount() {
    return getModule(CartStore, this.$store).userCartCount;
  }

  clearCart() {
    this.$serviceLocator.getService(ProfileService).clearCart();
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
      @apply outline-none mb-6 ml-32 text-gray-color;
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
