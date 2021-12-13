<template>
  <main class="w-screen h-screen">
    <AuthForm class="float-right" />
    <!--    <form class="flex flex-col" @submit.prevent="onLogon">-->
    <!--      <input v-model="loginFormData.email" />-->
    <!--      <input v-model="loginFormData.password" />-->
    <!--      <button type="submit">Войти</button>-->
    <!--    </form>-->
    <!--    <div class="flex flex-col">-->
    <!--      <button type="button" class="mt-60" @click="register">Зарегаться</button>-->
    <!--      <button type="button" class="mt-60" @click="resendVerifyEmail">Выслать код повторно</button>-->
    <!--      <button type="button" class="mt-60" @click="verifyEmail">Подтвердить код</button>-->
    <!--    </div>-->
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { AuthService } from "../AuthService";
import LoginData from "../models/LoginData";
import RegistrationData from "../models/RegistrationData";
import AuthForm from "@/modules/Auth/components/AuthForm.vue";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";

@Component({ components: { AuthForm } })
export default class LoginPage extends Vue {
  loginFormData: LoginData = new LoginData();

  async onLogon() {
    await this.$serviceLocator.getService(AuthService).login(this.loginFormData);
  }

  async register() {
    const regData = new RegistrationData({
      first_name: "Sergey",
      last_name: "Ryzhkov",
      phone: "79218941537",
      email: "sergeyryzhkov76@gmail.com",
      password: "sergeyryzhkov76@gmail.com",
      address: "Spb",
    });
    await this.$serviceLocator.getService(AuthService).register(regData);
  }

  async resendVerifyEmail() {
    await this.$serviceLocator.getService(AuthService).resendVerifyEmail("sergeyryzhkov76@gmail.com");
  }

  async verifyEmail() {
    await this.$serviceLocator
      .getService(AuthService)
      .verifyEmail("sergeyryzhkov76@gmail.com", "sergeyryzhkov76@gmail.com", "2221");
  }

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }
}
</script>
