<template>
  <div>
    <span
      class="vue-dialog_close-button text-32 ml-auto cursor-pointer font-normal after:content-['\00d7']"
      @click="$emit('close')"
    ></span>
    <div class="px-100 flex flex-col items-center justify-center py-40">
      <img src="/icons/alert_check.svg" width="74" height="74" />
      <span class="text-24 mt-40 text-center">Ваш заказ оформлен!</span>
      <nuxt-link
        :to="{ name: 'orders' }"
        class="text-14 mt-32 text-center underline focus:no-underline"
        @click.native="$emit('close')"
        >Перейти в личный кабинет</nuxt-link
      >
    </div>
  </div>
</template>
