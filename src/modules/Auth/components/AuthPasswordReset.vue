<template>
  <div>
    <AuthSubHeader :title="title" :description="description"/>
    <BaseInput v-model="email" :has-error="$v.email.$error" placeholder="Введите электронную почту"></BaseInput>
    <BaseButton class="mt-40" @click="resendVerifyEmail">Отправить</BaseButton>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from "nuxt-property-decorator";
import AuthSubHeader from "@/modules/Auth/components/AuthSubHeader.vue";
import {AuthService} from "@/modules/Auth/AuthService";
import {required, email} from "vuelidate/lib/validators";

const validations = () => {
  return {
    email: {
      required, email
    }
  }
}
@Component({components: {AuthSubHeader}, validations})
export default class AuthPasswordReset extends Vue {
  title: string = "Восстановление пароля";
  description: string = "Мы отправим вам письмо с ссылкой для восстановления пароля на указанную почту";
  email: string = "";

  async resendVerifyEmail() {
    // this.$v.$touch()
    // if (this.$v.$invalid){
    //   return;
    // }
    // await this.$serviceLocator.getService(AuthService).resendVerifyEmail(this.email);
    this.$emit("setFormType", "verify");
  }
}
</script>

<style></style>
