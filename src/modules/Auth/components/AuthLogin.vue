<template>
  <div>
    <AuthSubHeader :title="title" :tabs-visible="true" :is-active="'login'" @setFormType="(type) => $emit('setFormType', type)" />
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
        <BaseCheckbox :id="'remember-me'" :label="'Запомнить меня'" />
        <div class="text-14 leading-20 cursor-pointer" @click="$emit('setFormType', 'reset')">Забыли пароль ?</div>
      </div>
      <BaseButton class="mt-40" type="submit">Войти</BaseButton>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { required, email, minLength } from "vuelidate/lib/validators";
import AuthSubHeader from "@/modules/Auth/components/AuthSubHeader.vue";
import LoginData from "@/modules/Auth/models/LoginData";
import { AuthService } from "@/modules/Auth/AuthService";

const validations = () => {
  return {
    loginFormData: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    },
  };
};

@Component({ components: { AuthSubHeader }, validations })
export default class AuthLogin extends Vue {
  title: string = "Войдите в свой аккаунт";
  loginFormData: LoginData = new LoginData();

  async onLogon() {
    this.$v.$reset();
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    await this.$serviceLocator.getService(AuthService).login(this.loginFormData);
  }
}
</script>

<style></style>
