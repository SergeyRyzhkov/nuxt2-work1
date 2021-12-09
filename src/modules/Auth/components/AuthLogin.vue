<template>
  <div>
    <AuthSubHeader :title="title" :tabsVisible="true" :isActive="'login'" @setFormType="(type) => $emit('setFormType', type)"/>
    <BaseInput placeholder="E-mail*" v-model="loginFormData.email" class="mb-27"/>
    <BaseInput placeholder="Пароль*" type="password" v-model="loginFormData.password"/>
    <div class="mt-24 flex items-center justify-between">
      <BaseCheckbox :id="'remember-me'" :label="'Запомнить меня'"/>
      <div class="text-14 leading-20 cursor-pointer" @click="$emit('setFormType', 'reset')">Забыли пароль ?</div>
    </div>
    <BaseButton class="mt-40" @click="onLogon">Войти</BaseButton>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from "nuxt-property-decorator";
import AuthSubHeader from "@/modules/Auth/components/AuthSubHeader.vue"
import LoginData from "@/modules/Auth/models/LoginData";
import {AuthService} from "@/modules/Auth/AuthService";
import {required, email} from "vuelidate/lib/validators";

const validations = () => {
  return {
    projectModel: {
      email: {required, email},
      password: {required},
    },
  };
};


@Component({components: {AuthSubHeader}})
export default class AuthLogin extends Vue {
  title: string = 'Войдите в свой аккаунт'
  loginFormData: LoginData = new LoginData();

  async onLogon() {
    // this.$v.$touch()
    // if (this.$v.$invalid){
    //   return;
    // }
    await this.$serviceLocator.getService(AuthService).login(this.loginFormData);
  }
}
</script>

<style></style>
