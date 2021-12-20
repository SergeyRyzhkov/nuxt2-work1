<template>
  <div class="flex min-h-full h-full">
    <div class="hidden md:block md:w-1/2 lg:w-7/12 bg-strong-nude opacity-50"></div>
    <div class="w-full md:w-1/2 lg:w-5/12 p-18 md:p-32 bg-white flex flex-col">
      <div class="mb-20 md:mb-60">
        <slot name="header">
          <div class="flex justify-between items-center">
            <button v-show="backEnabled" type="button" class="flex items-center" @click="$emit('go-back')">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.99316 9.9873L1.98621 5.98035L5.99316 1.97339"
                  stroke="#16192C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              <span class="text-14 font-semibold ml-16" @click="$emit('go-back')">Назад</span>
            </button>
            <slot name="header-center"></slot>
            <span class="after:content-['\00d7'] text-32 font-normal cursor-pointer ml-auto" @click="$emit('close')"></span>
          </div>
        </slot>
      </div>
      <div class="ml-auto mr-auto w-full h-full overflow-hidden">
        <slot name="right-side"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BaseModalFullScreen extends Vue {
  @Prop({ default: true })
  backEnabled: boolean;
}
</script>

<style lang="scss">
@import "~/assets/styles/_vue-js-modal.scss";
</style>
