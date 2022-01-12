<template>
  <div class="container">
    <div v-if="isVisible" class="cookie-component flex sm:items-center sm:justify-between pr-23 pl-21 py-19">
      <figure class="cookie-image mt-[-8px] sm:mt-0">
        <picture>
          <img src="/images/cookie.png" width="40" height="40px" alt="cookie">
        </picture>
      </figure>
      <div class="ml-14 flex flex-col sm:flex-row sm:items-center">
        <div class="whitespace-nowrap flex-col sm:flex-row flex text-16 tracking-wide">Мы используем Cookies. <a href="javascript:void(0)" class="link-hover ml-4"> Читать далее</a></div>
        <BaseButton class="sm:ml-20 mt-16 sm:mt-0 cookie-btn" @click="setCookie">я согласен</BaseButton>
        <svg @click="visible = false" class="sm:ml-18 close-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="15.1591" height="1.51591" rx="0.757954" transform="matrix(0.701006 0.713155 -0.701006 0.713155 1.0625 0.108887)" fill="white"/>
          <rect width="15.1591" height="1.51591" rx="0.757954" transform="matrix(0.701006 -0.713155 0.701006 0.713155 0.310547 10.8108)" fill="white"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component
export default  class CookieComponent extends Vue{
  visible: boolean = false

  get isVisible(){
    const isAccepted = this.$cookies.get('useCookies')
    return this.visible && !isAccepted
  }
  fetch() {
    const isAccepted = this.$cookies.get('useCookies')
    if (!isAccepted){
      this.visible = true
    }
  }

  setCookie(){
      this.$cookies.set('useCookies', true)
    this.visible = false
  }
}
</script>

<style lang="scss">
.cookie-component{
  z-index: 10000;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  border-radius: 20px;
  background: $primary;
  color: white;
  @include mobile {
    left: initial;
    max-width: 600px;
    bottom: 32px;
  }
  .cookie-image{
    width: 40px;
    height: 40px;
  }
  .close-icon{
      width: 12px;
    height: 12px;
    right: 24px;
    top: 24px;
    position: absolute;
    @include mobile {
        position: static;
    }
    cursor: pointer;
  }
  .cookie-btn{
    background: #ffffff;
    color: black;
    padding: 10px !important;
    font-size: 12px;
    line-height: 20px;

  }
}

</style>
