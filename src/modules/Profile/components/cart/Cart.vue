<template>
  <div class="xl:px-40 h-full mt-7 cart" :class="{ 'pr-0 xl:pr-0 md:pl-58 xl:pl-58': isOrdering }">
    <div class="relative h-full">
      <div v-if="!isOrdering" class="cart-title">
        <div class="flex items-end relative">
          <h2>Корзина</h2>
          <div class="cart-counter">3</div>
        </div>
        <button>Очистить</button>
      </div>
      <div :class="{ 'm-cart': isOrdering }" class="mt-24 md:mt-42 flex flex-col h-full">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg class="mt-[-6px]" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.1991 10.0979C4.35514 8.56679 5.64456 7.4021 7.18365 7.4021H18.8162C20.3552 7.4021 21.6447 8.56679 21.8007 10.0979L22.9007 20.8913C23.0808 22.6593 21.6932 24.1955 19.9161 24.1955H6.08369C4.30656 24.1955 2.91897 22.6593 3.09915 20.8913L4.1991 10.0979Z"
                stroke="#131313"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.917 10.7607V5.72272C16.917 3.56096 15.1631 1.80426 12.9985 1.80426C10.8344 1.80426 9.08008 3.56335 9.08008 5.72272V10.7607"
                stroke="#131313"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="ml-15">Товары</div>
            <svg class="ml-15" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.46967 9.84869C5.17678 9.5558 5.17678 9.08092 5.46967 8.78803C5.76256 8.49514 6.23744 8.49514 6.53033 8.78803L5.46967 9.84869ZM12.3181 15.6365L12.8484 16.1668L12.3181 16.6971L11.7878 16.1668L12.3181 15.6365ZM18.1059 8.78803C18.3988 8.49514 18.8737 8.49514 19.1666 8.78803C19.4595 9.08092 19.4595 9.5558 19.1666 9.84869L18.1059 8.78803ZM6.53033 8.78803L12.8484 15.1061L11.7878 16.1668L5.46967 9.84869L6.53033 8.78803ZM11.7878 15.1061L18.1059 8.78803L19.1666 9.84869L12.8484 16.1668L11.7878 15.1061Z"
                fill="#131313"
              />
            </svg>
          </div>
          <div>2</div>
        </div>
        <div class="flex flex-col cart-items" :class="{ 'order-items': isOrdering }">
          <CartItem :is-ordering="isOrdering" />
          <CartItem :is-ordering="isOrdering" />
          <CartItem :is-ordering="isOrdering" />
        </div>
        <CartTotal :is-ordering="isOrdering" :class="{ 'total-static': isOrdering }" />
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
