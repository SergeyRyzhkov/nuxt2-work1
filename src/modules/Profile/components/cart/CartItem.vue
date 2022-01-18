<template>
  <section class="cart-item">
    <figure class="cart-item-image">
      <img v-lozad="imageSrc" alt="" itemprop="image" class="" />
      <figcaption></figcaption>
    </figure>
    <div class="pl-16 md:pl-26 w-full" :class="{ 'flex justify-between md:items-center flex-col md:flex-row w-full': isOrdering }">
      <div>
        <div class="cart-item-title" :class="{ 'cart-item-title-ordering': isOrdering }">
          {{ cartItem.product.meta_title }} {{cartItem.product_id}}
        </div>
        <div class="cart-item-id">Артикул: {{ cartItem.product.vendor_code }}</div>
      </div>
      <div v-if="isOrdering">1 шт.</div>
      <div class="flex md:items-center md:flex-row flex-col justify-between">
        <div v-if="!isOrdering" class="cart-item-products_counter flex items-center">
          <button class="cart-item-product_action" @click="changeCountItem(cartItem.id, cartItem.count - 1)">
            <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0.956543" width="12" height="2.08696" rx="1.04348" fill="#EF8532" />
            </svg>
          </button>
          <div class="number">{{ cartItem.count }}</div>
          <button class="cart-item-product_action" @click="changeCountItem(cartItem.id, cartItem.count + 1)">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="5.95654" width="12" height="2.08696" rx="1.04348" fill="#EF8532" />
              <rect x="7" y="0.739258" width="12.5217" height="2" rx="1" transform="rotate(90 7 0.739258)" fill="#EF8532" />
            </svg>
          </button>
        </div>
        <div class="cart-item-price whitespace-nowrap">1 905 ₽</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";
import ProductModel from "@/modules/Catalog/models/ProductModel";
import { ProfileService } from "@/modules/Profile/ProfileService";
@Component
export default class CartItem extends Vue {
  @Prop({ default: false })
  isOrdering: boolean;

  @Prop()
  cartItem: ProductModel;

  changeCountItem(id: number, count: number) {
    this.$serviceLocator.getService(ProfileService).changeCountCartItem(id, count)
    // this.$serviceLocator.getService(ProfileService).deleteFromCart(id) // delete item
  }

  get imageSrc() {
    return this.cartItem?.logo && this.cartItem?.logo.length ? this.cartItem.logo[0].url : "/images/product-no-photo.jpg";
  }

}
</script>

<style lang="scss">
.cart-item {
  @apply pt-23 pb-30 flex md:items-center items-start;
  &-products_counter {
    .number {
      @apply px-5 text-center;
      width: 37px;
    }
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
