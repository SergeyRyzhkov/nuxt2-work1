<template>
  <div class="flex items-center py-55 justify-between mb-55">
    <div class="w-63">
      <div v-if="backBtn" class="flex items-center text-14 leading-24 cursor-pointer" @click="$emit('back')">
        <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.36328 1L1.99932 7.36396L8.36328 13.7279" stroke="#16192C" stroke-width="2" stroke-linecap="round" />
        </svg>
        <div class="ml-8">Назад</div>
      </div>
    </div>
    <div class="m-auto">
      <img src="/images/logo-dark.png" />
    </div>
    <div class="close-btn" @click="$router.push({ name: 'main' })">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          width="20.2117"
          height="2.02117"
          rx="1.01059"
          transform="matrix(0.701006 0.713155 -0.701006 0.713155 1.41602 0.145508)"
          fill="black"
        />
        <rect
          width="20.2117"
          height="2.02117"
          rx="1.01059"
          transform="matrix(0.701006 -0.713155 0.701006 0.713155 0.414062 14.4141)"
          fill="black"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class FormHeader extends Vue {
  @Prop({ default: false })
  backBtn: boolean;
}
</script>

<style lang="scss" scoped>
.close-btn {
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  padding: 13px;
  cursor: pointer;
}
.w-63 {
  width: 63px;
}
</style>
