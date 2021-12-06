<template>
  <div class="loading">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <!-- <img src="/images/f" alt="airplane" class="loading__image" /> -->
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" class="loading__icon">
      <path
        d="M26.8808 0.378225L30.6897 23.2522L53.2098 27.1193L30.7233 30.7821L27.1189 53.6225L23.31 30.7485L0.789933 26.8814L23.2764 23.2186L26.8808 0.378225Z"
        fill="#16192C"
      />
      <path
        d="M37.7111 16.121L30.0441 27.0141L37.8088 37.9773L27.0149 30.0913L16.291 37.8796L23.958 26.9865L16.1932 16.0234L26.9872 23.9094L37.7111 16.121Z"
        fill="#16192C"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BaseLoading extends Vue {
  @Prop({ default: 30 })
  size: number;
}
</script>

<style scoped lang="scss">
/*! purgecss start ignore */
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  position: relative;

  &__icon {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 76px;
  height: 76px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 68px;
  height: 68px;
  margin: 4px;
  border: 4px solid #16192c;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #16192c transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/*! purgecss end ignore */
</style>
