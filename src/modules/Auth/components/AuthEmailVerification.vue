<template>
  <div>
    <AuthSubHeader :title="title" :email="email" />
    <BaseInput v-model="code" placeholder="Код из почты" :has-error="$v.code.$error"></BaseInput>
    <div class="text-code mt-20 mb-40">Запросить код повторно можно через 22 секунд</div>
    <BaseButton @click="verifyEmail">Подтвердить</BaseButton>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { required } from "vuelidate/lib/validators";
import AuthSubHeader from "@/modules/Auth/components/AuthSubHeader.vue";
import { AuthService } from "@/modules/Auth/AuthService";

const validations = () => {
  return {
    code: { required },
  };
};

@Component({ components: { AuthSubHeader }, validations })
export default class AuthEmailVerification extends Vue {
  email: string = "svetlana_lebedeva@mail.ru";
  title: string = "Подтвердите почту";
  code: string;

  async verifyEmail() {
    this.$v.$reset();
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    await this.$serviceLocator
      .getService(AuthService)
      .verifyEmail("sergeyryzhkov76@gmail.com", "sergeyryzhkov76@gmail.com", this.code);
  }
}
</script>

<style lang="scss">
.text-code {
  color: #838383;
  line-height: 17px;
  @apply text-14;
}
</style>
