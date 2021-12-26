<template>
  <section class="cart-item">
    <figure class="cart-item-image">
      <img src="/images/tmp_product.jpg" alt="" itemprop="image" class="" loading="lazy" />
      <figcaption></figcaption>
    </figure>
    <div class="pl-16 md:pl-26" :class="{ 'flex justify-between md:items-center flex-col md:flex-row w-full': isOrdering }">
      <div>
        <div class="cart-item-title" :class="{ 'cart-item-title-ordering': isOrdering }">
          Спрей KAYPRO Botu-Cure восстанавливающий - 200 мл.
        </div>
        <div class="cart-item-id">Артикул: 12345678</div>
      </div>
      <div v-if="isOrdering">1 шт.</div>
      <div class="flex md:items-center md:flex-row flex-col justify-between">
        <div v-if="!isOrdering" class="cart-item-products_counter flex items-center">
          <button class="cart-item-product_action">
            <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0.956543" width="12" height="2.08696" rx="1.04348" fill="#EF8532" />
            </svg>
          </button>
          <div class="number">1</div>
          <button class="cart-item-product_action">
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
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class CartItem extends Vue {
  @Prop({ default: false })
  isOrdering: boolean;
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
