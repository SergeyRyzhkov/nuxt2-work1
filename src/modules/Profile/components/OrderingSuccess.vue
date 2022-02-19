<template>
  <div>
    <span
      class="vue-dialog_close-button ml-auto cursor-pointer text-32 font-normal after:content-['\00d7']"
      @click="$emit('close')"
    ></span>
    <div class="flex flex-col items-center justify-center px-100 py-40">
      <img src="/icons/alert_check.svg" width="74" height="74" />
      <span class="mt-40 text-center text-24">Ваш заказ оформлен!</span>
      <nuxt-link
        :to="{ name: 'orders' }"
        class="mt-32 text-center text-14 underline focus:no-underline"
        @click.native="$emit('close')"
        >Перейти в личный кабинет</nuxt-link
      >
    </div>
  </div>
</template>
