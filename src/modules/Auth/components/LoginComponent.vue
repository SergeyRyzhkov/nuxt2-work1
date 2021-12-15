<template>
  <form @submit.prevent="onLogon">
    <BaseInput
      v-model="loginFormData.email"
      placeholder="E-mail*"
      :has-error="$v.loginFormData.email.$error"
      class="mb-27"
      :is-shake-error="true"
      @blur="$v.loginFormData.email.$touch()"
    />
    <BaseInput
      v-model="loginFormData.password"
      placeholder="Пароль*"
      :has-error="$v.loginFormData.password.$error"
      :is-shake-error="true"
      type="password"
      @blur="$v.loginFormData.password.$touch()"
    />
    <div class="mt-24 flex items-center justify-between">
      <BaseCheckbox id="remember-me" v-model="loginFormData.rememberMe" label="Запомнить меня" />
      <div class="text-14 cursor-pointer text-secondary" @click="$emit('reset-clicked')">Забыли пароль ?</div>
    </div>
    <BaseButton class="mt-40 md:mt-60" type="submit">Войти</BaseButton>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { required, email } from "vuelidate/lib/validators";
import { LogonStatus } from "../models/LogonResult";
import LoginData from "@/modules/Auth/models/LoginData";
import { AuthService } from "@/modules/Auth/AuthService";

const validations = () => {
  return {
    loginFormData: {
      email: { required, email },
      password: { required },
    },
  };
};

@Component({ validations })
export default class LoginComponent extends Vue {
  title: string = "Войдите в свой аккаунт";
  loginFormData: LoginData = new LoginData();

  async onLogon() {
    this.$v.$reset();
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    const result = await this.$serviceLocator.getService(AuthService).login(this.loginFormData);
    if (result.logonStatus === LogonStatus.OK && !this.$serviceLocator.getService(AuthService).isUserActive) {
      this.$emit("need-verify-email", this.loginFormData);
    }
    if (result.logonStatus === LogonStatus.OK && this.$serviceLocator.getService(AuthService).isUserActive) {
      this.$emit("login-success", this.loginFormData);
    }
    if (result.logonStatus !== LogonStatus.OK) {
      this.$emit("error", "Неверный логин или пароль !");
    }
  }
}
</script>

<style></style>
