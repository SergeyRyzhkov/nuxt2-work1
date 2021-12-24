<template>
  <div class="xl:px-40 h-full mt-7 cart" :class="{ 'pr-0 xl:pr-0 pl-58 xl:pl-58': isOrdering }">
    <div class="relative h-full">
      <div v-if="!isOrdering" class="cart-title">
        <div class="flex items-end relative">
          <h2>Корзина</h2>
          <div class="cart-counter">3</div>
        </div>
        <button>Очистить</button>
      </div>
      <div :class="{ 'm-cart': isOrdering }" class="mt-24 md:mt-42 flex flex-col h-full">
        <div class="flex flex-col cart-items" :class="{ 'order-items': isOrdering }">
          <CartItem />
          <CartItem />
        </div>
        <CartTotal :class="{ 'total-static': isOrdering }" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class Cart extends Vue {
  @Prop({ default: false })
  isOrdering: boolean;
}
</script>

<style lang="scss">
.cart {
  .m-cart {
    margin-top: 0 !important;
  }
  .total-static {
    position: static !important;
  }
  &-items {
    @apply pr-6;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #131313;
    }
    max-height: calc(100% - 300px);
    overflow-y: auto;
    &.order-items {
      max-height: 100% !important;
      > .cart-item {
        border-top: 1px solid transparent !important;
      }
    }
    > .cart-item {
      border-bottom: 1px solid #c9c9c9;
      &:first-child {
        border-top: 1px solid #c9c9c9;
      }
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
}
</style>
