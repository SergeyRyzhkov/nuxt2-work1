<template>
<div class="flex flex-col footer-subscribe">
    <div>ПОДПИСАТЬСЯ</div>
    <div class="mt-1">Будьте всегда в курсе!</div>
    <div class="mt-20 lg:mt-40 footer-subscribe-input">
      <BaseInput placeholder="E-mail"/>
      <button>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3 13.5C3 13.0398 3.3731 12.6667 3.83333 12.6667L20.1549 12.6667L14.911 7.42258C14.5855 7.09714 14.5855 6.5695 14.911 6.24407C15.2364 5.91864 15.7641 5.91865 16.0895 6.24409L22.7559 12.9108C23.0814 13.2362 23.0814 13.7638 22.7559 14.0892L16.0895 20.7559C15.7641 21.0814 15.2364 21.0814 14.911 20.7559C14.5855 20.4305 14.5855 19.9029 14.911 19.5774L20.1549 14.3333L3.83333 14.3333C3.3731 14.3333 3 13.9602 3 13.5Z" fill="white"/>
        </svg>
      </button>
    </div>
</div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component
export default class FooterSubscribe extends Vue{}
</script>

<style lang="scss">
.footer-subscribe{
  color: #ffffff;
  font-size: 14px;
  line-height: 24px;
  &-input {
    position: relative;
    > button {
      position: absolute;
      top: 32%;
      right: 0;
      transform: translateY(-50%);
    }
    input {
      line-height: 24px;
      padding-bottom: 12px;
      &::placeholder{
        color: $footer-color;
      }
      background: transparent;
      color: $footer-color;
      border-color: $footer-color;
    }
  }
}

</style>
