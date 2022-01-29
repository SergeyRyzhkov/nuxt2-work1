<template>
  <section>
    <h1 class="mb-40 uppercase md:mb-60">{{ title }}</h1>
    <div class="auth-logon-tabs mb-40 w-full md:mb-60 md:w-1/2">
      <button
        type="button"
        class="auth-logon__tab"
        :class="{ 'auth-logon__tab--active': currentTab === 0 }"
        @click="currentTab = 0"
      >
        Вход
      </button>
      <button
        type="button"
        class="auth-logon__tab"
        :class="{ 'auth-logon__tab--active': currentTab === 1 }"
        @click="currentTab = 1"
      >
        Регистрация
      </button>
    </div>

    <LoginComponent
      v-show="currentTab === 0"
      @reset-clicked="$emit('reset-clicked')"
      @need-verify-email="(logonData) => $emit('need-verify-email', logonData)"
      @login-success="$emit('login-success')"
      @error="(message) => $emit('error', message)"
    ></LoginComponent>
    <RegistrationComponent
      v-show="currentTab === 1"
      @registration-success="(logonData) => $emit('registration-success', logonData)"
      @error="(message) => $emit('error', message)"
    ></RegistrationComponent>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class LoginRegistrationForm extends Vue {
  currentTab = 0;

  get title() {
    return this.currentTab === 0 ? "Войдите в свой аккаунт" : "Регистрация";
  }
}
</script>

<style lang="scss">
.auth-logon-tabs {
  display: flex;
  border-bottom: 1px solid #dddde4;
}
.auth-logon {
  &__tab {
    width: 100%;
    font-weight: 500;
    color: #9d9d9d;
    border: none;
    padding: 0 0 15px;
    position: relative;
    transition: all 0.5s ease;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: $primary;
      opacity: 0;
      transition: all 0.5s ease;
    }
    &--active {
      color: $primary;
      &:before {
        opacity: 1;
      }
    }
  }
}
</style>
