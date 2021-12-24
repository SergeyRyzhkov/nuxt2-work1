<template>
  <BaseModalFullScreen :back-enabled="false" :isPinnedHeader="true" @close="$emit('close')">
    <template #right-side>
        <div class="xl:px-40 h-full mt-7 cart">
          <div class="relative h-full">
            <div class="cart-title">
              <div class="flex items-end relative">
                <h2>Корзина</h2>
                <div class="cart-counter">3</div>
              </div>
              <button>Очистить</button>
            </div>
            <div class="mt-24 md:mt-42 flex flex-col h-full">
              <div class="flex flex-col cart-items">
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
              </div>
              <CartTotal />
            </div>
          </div>

        </div>

    </template>
  </BaseModalFullScreen>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component
export default class CartModal extends Vue{
}
</script>
<style lang="scss">
.cart{
  &-items {
    @apply pr-6;
    &::-webkit-scrollbar{
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
    > .cart-item {
      border-bottom: 1px solid #C9C9C9;
      &:first-child{
        border-top: 1px solid #C9C9C9;
      }
    }
  }
  &-title{
    overflow: visible;
    padding-top: 2px;
    .cart-counter{
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
    > button{
      font-size: 14px;
      line-height: 17px;
      @apply text-gray-color mb-6 ml-32 outline-none;
    }
  }


}
</style>
