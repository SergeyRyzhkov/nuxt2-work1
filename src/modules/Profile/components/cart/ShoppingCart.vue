<template>
  <div class="shopping-cart mt-7 h-full xl:px-40">
    <div class="relative h-full">
      <div class="shopping-cart-title">
        <div class="relative flex items-end">
          <h2>Корзина</h2>
          <div class="shopping-cart-counter">{{ cartItemsCount }}</div>
        </div>
        <button @click="clearCart()">Очистить</button>
      </div>
      <div v-if="!!cartItems && !!cartItems.length" class="md:mt-42 mt-24 flex h-full flex-col justify-between">
        <div class="shopping-cart-items flex flex-col pr-6">
          <CartItem v-for="(item, index) in cartItems" :key="index" :cart-item="item" />
        </div>

        <div class="mb-100 mt-40 w-full">
          <div v-if="!!cartWeight" class="text-14 flex items-center justify-between">
            <div>Общий вес</div>
            <div>{{ cartWeight }} г</div>
          </div>
          <div class="mt-25 text-24 flex items-center justify-between">
            <div>Итого</div>
            <div>{{ cartPrice }} ₽</div>
          </div>
          <BaseButton class="mt-32 w-full" @click="gotoOrdering()">Перейти к оформлению</BaseButton>
        </div>
      </div>

      <div class="mt-46 lg:mt-127 flex flex-col items-center justify-center">
        <img src="/icons/shop-cart-big.svg" width="54" height="54" />
        <span class="text-14 mt-22">Ваша корзина пуста</span>
        <span class="text-14 text-gray-color mt-8">Пожалуйста, добавьте еще товаров в корзину</span>
        <span class="text-14 mt-24 cursor-pointer underline hover:no-underline lg:mt-32" @click="gotoCatalog()">Каталог</span>
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
    const sum = this.cartItems.reduce((sum, iterCart) => sum + (+iterCart?.product?.price || 0) * iterCart.count, 0);
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

  gotoCatalog() {
    this.$emit("close");
    if (this.$route.name !== "catalog-root") {
      this.$router.push({ name: "catalog-root" });
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
