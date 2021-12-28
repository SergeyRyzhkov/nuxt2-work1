<template>
  <section class="flex flex-col md:flex-row md:items-start product-card">
    <div class="md:w-1/2 lg:w-7/12">
    </div>
    <div class="lg:w-5/12 md:w-1/2">
      <h2 class="text-24">MAIKE Fluid Foundation 01 Light Beige - Тональный флюид</h2>
      <div class="text-gray-color mt-16 text-14">Артикул: 1233456789</div>
      <div class="mt-32">
        <div class="flex flex-row md:flex-col items-center md:items-start justify-between">
          <div class="text-28 font-bold">2 815 ₽</div>
          <div class="md:mt-32 flex items-center">
            <div class="product-card-counter flex items-center">
              <BaseButton class="mr-4">
                <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.956543" width="12" height="2.08696" rx="1.04348" fill="#9D9D9D"/>
                </svg>
              </BaseButton>
              <div class="product-card-counter-num text-14">1</div>
              <BaseButton  class="ml-4">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="5.95654" width="12" height="2.08696" rx="1.04348" fill="#131313"/>
                  <rect x="7" y="0.739258" width="12.5217" height="2" rx="1" transform="rotate(90 7 0.739258)" fill="#131313"/>
                </svg>
              </BaseButton>
            </div>
            <div class="text-[#4BC967] ml-24 text-14 hidden md:block">В наличии на складе</div>
          </div>
        </div>
        <div class="mt-32 flex items-center justify-between md:justify-start">
          <BaseButton>Добавить в корзину</BaseButton>
          <BaseButton class="ml-14 product-card-favorite flex items-center justify-center">
            <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.416 3.54405C11.416 3.54402 10.1589 0.72168 7.02852 0.72168C4.23658 0.72168 1.66602 2.95982 1.66602 6.72563C1.66602 10.3162 4.98943 12.8483 6.79945 14.5729C8.60947 16.2975 11.416 18.2717 11.416 18.2717C11.416 18.2717 14.2226 16.2975 16.0326 14.5729C17.8426 12.8483 21.166 10.3162 21.166 6.72563C21.166 2.95982 18.5955 0.72168 15.8035 0.72168C12.6731 0.72168 11.416 3.54402 11.416 3.54405Z"
                    stroke="#131313" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </BaseButton>
        </div>
      </div>
      <div class="mt-32">
        <div class="text-16 font-bold">Доставка</div>
        <div class="flex items-center mt-18">
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 5.25L9.5 9.5V18L1 13.75V5.25Z" stroke="#131313" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18 5.25L9.5 9.5V18L18 13.75V5.25Z" stroke="#131313" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 1L18 5.25L9.5 9.5L1 5.25L9.5 1Z" stroke="#131313" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.25 3.125L13.75 7.375V10.775" stroke="#131313" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="ml-12 text-14">в <span class="text-secondary">Москву</span> бесплатно</div>
        </div>
        <div class="text-gray-color mt-16 text-12">Цена действительна только для интернет-магазина и может отличаться от цен в розничных магазинах</div>
      </div>
      <div class="mt-32 p-24 product-card-delivery">
        <div class="text-14 font-bold">Доставка до двери по Москве - на следующий рабочий день. При заказе от 3000 рублей - бесплатно!</div>
        <div class="text-12 mt-8">Для заказов по Москве доступна бесплатная доставка курьерами фирмы при заказе от 3000 рублей. Желаем приятных покупок!</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component
export default class ProductCard extends Vue {
}
</script>

<style lang="scss">
.product-card{
  &-delivery{
    background: #FFF7F4;
    border-radius: 20px;
  }
  &-favorite {
    min-width: 52px;
    width: 52px;
    height: 52px;
    padding: 0 !important;
  }
  &-counter {
    &-num {
      text-align: center;
      width: 37px;
    }
    button{
      width: 36px;
      height: 36px;
      padding: 0 !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

}
</style>
