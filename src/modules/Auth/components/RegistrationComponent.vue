<template>
  <form @submit.prevent="register">
    <BaseInput
      v-model="registrationData.fio"
      placeholder="ФИО*"
      :has-error="$v.registrationData.fio.$error"
      class="mb-27"
      @blur="$v.registrationData.fio.$touch()"
    />
    <BaseInput
      v-model="registrationData.phone"
      type="tel"
      placeholder="Телефон"
      :mask="phoneMask"
      :has-error="$v.registrationData.phone.$error"
      class="mb-27"
      @blur="$v.registrationData.phone.$touch()"
    />
    {{ registrationData.phone }}
    <BaseInput
      v-model="registrationData.email"
      placeholder="Email*"
      :has-error="$v.registrationData.email.$error"
      class="mb-27"
      @blur="$v.registrationData.email.$touch()"
    />
    <BaseInput
      v-model="registrationData.address"
      placeholder="Адрес*"
      :has-error="$v.registrationData.address.$error"
      class="mb-27"
      @blur="$v.registrationData.address.$touch()"
    />
    <BaseInput
      v-model="registrationData.password"
      placeholder="Пароль*"
      type="password"
      :has-error="$v.registrationData.password.$error"
      class="mb-27"
      @blur="$v.registrationData.password.$touch()"
    />
    <BaseInput
      v-model="registrationData.password_confirmation"
      placeholder="Подтвердите пароль*"
      type="password"
      :has-error="$v.registrationData.password_confirmation.$error"
      class="mb-27"
      @blur="$v.registrationData.password_confirmation.$touch()"
    />
    <div class="flex flex-col mt-24">
      <div class="flex items-center relative mb-14">
        <input id="privacy" v-model="registrationData.agreement" type="checkbox" />
        <label class="text-14 leading-20 ml-12 cursor-pointer checkbox-label" for="privacy"
          >Я согласен на обработку персональных данных</label
        >
      </div>
      <div class="flex items-center relative">
        <input id="news" v-model="registrationData.subscribe" type="checkbox" />
        <label class="text-14 leading-20 ml-12 cursor-pointer checkbox-label" for="news"
          >Информирование о новинках и акциях</label
        >
      </div>
    </div>
    <BaseButton type="submit" class="mt-40 md:mt-60">Зарегистрироваться</BaseButton>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { required, email, sameAs } from "vuelidate/lib/validators";
import RegistrationData from "../models/RegistrationData";
import { AuthService } from "../AuthService";
import { RegistrationStatus } from "../models/RegistrationResult";
import LoginData from "../models/LoginData";
import { phoneMask } from "@/utils/InputMaskDefinitions";

const validations = () => {
  return {
    registrationData: {
      fio: { required },
      phone: { required },
      email: { required, email },
      password: { required },
      password_confirmation: { required, sameAsPassword: sameAs("password") },
      address: { required },
      agreement: { mustBeTrue },
      subscribe: { mustBeTrue },
    },
  };
};

const mustBeTrue = (value) => !!value;

@Component({ validations })
export default class RegistrationComponent extends Vue {
  title: string = "Войдите в свой аккаунт";
  registrationData: RegistrationData = new RegistrationData();

  phoneMask = phoneMask;

  async register() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    RegistrationData.buildFirstSecondPatrFromFio(this.registrationData);

    const result = await this.$serviceLocator.getService(AuthService).register(this.registrationData);
    if (result.registrationStatus === RegistrationStatus.OK) {
      this.$emit(
        "registration-success",
        new LoginData({ email: this.registrationData.email, password: this.registrationData.password })
      );
    } else {
      this.$emit("error", "Не удалось выполнить регистрацию !");
    }
  }
}
</script>

<style></style>
