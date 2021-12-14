<template>
  <section>
    <h1 class="uppercase mb-20">Восстановление пароля</h1>
    <div class="mb-40 md:mb-60">Мы отправим вам письмо с ссылкой для восстановления пароля на указанную почту</div>
    <BaseInput
      v-model="email"
      :has-error="$v.email.$error"
      placeholder="Введите адрес электронной почты"
      :is-shake-error="true"
      @blur="$v.email.$touch()"
    ></BaseInput>
    <BaseButton class="mt-20 md:mt-40" @click="recoverPassword"> Отправить</BaseButton>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { required, email } from "vuelidate/lib/validators";
import { AuthService } from "@/modules/Auth/AuthService";

const validations = () => {
  return {
    email: {
      required,
      email,
    },
  };
};
@Component({ validations })
export default class PasswordReset extends Vue {
  email: string = "";

  async recoverPassword() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    if (await this.$serviceLocator.getService(AuthService).recoverPassword(this.email)) {
      this.$emit("reset-success");
    } else {
      this.$emit("error", "Ошибка восстановления пароля !");
    }
  }
}
</script>

<style></style>
