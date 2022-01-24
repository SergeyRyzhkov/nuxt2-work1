<template>
  <section class="cart-item pr-16">
    <img v-lazyimg="imageSrc" alt=" " class="object-scale-down hover:scale-105 h-86 w-86 md:w-127 md:h-127" />
    <div
      class="pl-16 md:pl-26 w-full"
      :class="{ 'flex justify-between md:items-center flex-col md:flex-row w-full': isOrdering }"
    >
      <div>
        <div class="cart-item-title" :class="{ 'cart-item-title-ordering': isOrdering }">
          {{ cartItem.product.meta_title }} {{ cartItem.product_id }}
        </div>
        <div class="cart-item-id">Артикул: {{ cartItem.product.vendor_code }}</div>
      </div>
      <div v-if="isOrdering">1 шт.</div>
      <div class="flex md:items-center md:flex-row flex-col justify-between">
        <div v-if="!isOrdering" class="cart-item-products_counter flex items-center">
          <button
            class="cart-item-product_action"
            :class="{ cartBtnDisable: cartItem.count === 1 }"
            @click="changeCountItem(cartItem.product_id, cartItem.count - 1)"
          >
            <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0.956543" width="12" height="2.08696" rx="1.04348" fill="#EF8532" />
            </svg>
          </button>
          <div class="number">{{ cartItem.count }}</div>
          <button class="cart-item-product_action" @click="changeCountItem(cartItem.product_id, cartItem.count + 1)">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="5.95654" width="12" height="2.08696" rx="1.04348" fill="#EF8532" />
              <rect x="7" y="0.739258" width="12.5217" height="2" rx="1" transform="rotate(90 7 0.739258)" fill="#EF8532" />
            </svg>
          </button>
        </div>
        <div class="cart-item-price whitespace-nowrap">{{ price }} ₽</div>
      </div>
    </div>
    <button class="remove-cart-item" @click="deleteCartItem">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          width="15.1591"
          height="1.51591"
          rx="0.757954"
          transform="matrix(0.701006 0.713155 -0.701006 0.713155 1.0625 0.108887)"
          fill="#9D9D9D"
        />
        <rect
          width="15.1591"
          height="1.51591"
          rx="0.757954"
          transform="matrix(0.701006 -0.713155 0.701006 0.713155 0.310547 10.8105)"
          fill="#9D9D9D"
        />
      </svg>
    </button>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { ProfileService } from "@/modules/Profile/ProfileService";
import CartModel from "@/modules/Profile/models/CartModel";
@Component
export default class CartItem extends Vue {
  @Prop({ default: false })
  isOrdering: boolean;

  @Prop()
  cartItem: CartModel;

  changeCountItem(id: number, count: number) {
    this.$serviceLocator.getService(ProfileService).changeCountCartItem(id, count);
  }

  deleteCartItem() {
    this.$serviceLocator.getService(ProfileService).deleteFromCart(this.cartItem.product_id);
  }

  get imageSrc() {
    return this.cartItem?.product.logo && this.cartItem?.product.logo.length
      ? this.cartItem.product.logo[0].url
      : "/images/product-no-photo.jpg";
  }

  get price() {
    if (this.cartItem.product.price) {
      return this.cartItem.product.price * this.cartItem.count;
    } else {
      return 0;
    }
  }
}
</script>

<style lang="scss">
.cart-item {
  @apply pt-23 pb-30 flex md:items-center items-start relative;
  &-products_counter {
    .number {
      @apply px-5 text-center;
      width: 37px;
    }
  }
  .cartBtnDisable {
    pointer-events: none;
    border-color: #c9c9c9 !important;
    svg {
      rect {
        fill: #c9c9c9;
      }
    }
  }
  .remove-cart-item {
    position: absolute;
    top: 27px;
    right: 16px;
  }
  &-product_action {
    width: 36px;
    height: 36px;
    border: 1px solid $secondary;
    border-radius: 100px;
    @apply flex items-center justify-center;
    > svg {
      width: 12px;
    }
  }
  &-price {
    font-size: 18px;
    line-height: 22px;
    @apply mt-24 md:mt-0;
  }
  &-id {
    @apply mb-20;
    font-size: 14px;
    line-height: 24px;
    color: $text-gray;
  }
  &-title {
    max-width: 100%;
    font-size: 14px;
    line-height: 22px;
    @apply mb-5;
    @include mobile {
      max-width: 340px;
    }
  }
  &-image {
    img {
      width: 100%;
      max-width: 100%;
      height: auto;
    }
    max-width: 84px;
    @include mobile {
      width: 126px;
    }
  }
}
</style>
