<template>
  <section class="flex flex-col md:flex-row md:items-start">
    <div class="md:w-1/2 lg:w-7/12"></div>
    <div class="lg:w-5/12 md:w-1/2">
      <div class="text-[#4BC967] ml-24 text-14 block md:hidden">В наличии на складе</div>
      <h2 class="text-24 font-semibold">MAIKE Fluid Foundation 01 Light Beige - Тональный флюид</h2>
      <div class="text-gray-color mt-16 text-14">Артикул: 1233456789</div>
      <div class="mt-32">
        <div class="flex flex-row md:flex-col items-center md:items-start justify-between">
          <div class="text-28 font-semibold">2 815 ₽</div>
          <div class="md:mt-32 flex items-center">
            <div class="flex items-center">
              <BaseButton class="rounded-full w-36 h-36" :padding-empty="true"><span class="text-24">+</span> </BaseButton>
              <div class="text-14 mx-12">1</div>
              <BaseButton class="rounded-full w-36 h-36" :padding-empty="true"><span class="text-24">-</span></BaseButton>
            </div>
            <div class="text-[#4BC967] ml-24 text-14 hidden md:block">В наличии на складе</div>
          </div>
        </div>
        <div class="mt-32 flex items-center justify-between md:justify-start">
          <BaseButton>Добавить в корзину</BaseButton>
          <BaseHeartButton
            class="ml-14 rounded-full flex items-cenetr justify-center w-52 h-52 border border-primary"
            :is-red="false"
            @click.prevent="add2Favor()"
          ></BaseHeartButton>
        </div>
      </div>
      <div class="mt-32">
        <div class="text-16 font-semibold">Доставка</div>
        <div class="flex items-center mt-18">
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1 5.25L9.5 9.5V18L1 13.75V5.25Z"
              stroke="#131313"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18 5.25L9.5 9.5V18L18 13.75V5.25Z"
              stroke="#131313"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.5 1L18 5.25L9.5 9.5L1 5.25L9.5 1Z"
              stroke="#131313"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.25 3.125L13.75 7.375V10.775"
              stroke="#131313"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="ml-12 text-14">в <span class="text-secondary">Москву</span> бесплатно</div>
        </div>
        <div class="text-gray-color mt-16 text-12">
          Цена действительна только для интернет-магазина и может отличаться от цен в розничных магазинах
        </div>
      </div>
      <div class="mt-32 p-24 bg-nude rounded-[20px]">
        <div class="text-14 font-semibold">
          Доставка до двери по Москве - на следующий рабочий день. При заказе от 3000 рублей - бесплатно!
        </div>
        <div class="text-12 mt-8">
          Для заказов по Москве доступна бесплатная доставка курьерами фирмы при заказе от 3000 рублей. Желаем приятных покупок!
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class ProductCard extends Vue {
  add2Favor() {}
}
</script>
