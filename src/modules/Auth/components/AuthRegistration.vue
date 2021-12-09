<template>
  <div>
    <AuthSubHeader
      :title="title"
      :tabs-visible="true"
      :is-active="'registration'"
      @setFormType="(type) => $emit('setFormType', type)"
    />
    <form @submit.prevent="register">
      <BaseInput
        v-model="RegistrationData.first_name"
        placeholder="Фамилия*"
        :has-error="$v.RegistrationData.first_name.$error"
        class="mb-27"
      />
      <BaseInput
        v-model="RegistrationData.second_name"
        placeholder="Имя*"
        :has-error="$v.RegistrationData.second_name.$error"
        class="mb-27"
      />
      <BaseInput
        v-model="RegistrationData.last_name"
        placeholder="Отчество*"
        :has-error="$v.RegistrationData.last_name.$error"
        class="mb-27"
      />
      <BaseInput
        v-model="RegistrationData.phone"
        placeholder="Телефон*"
        :has-error="$v.RegistrationData.phone.$error"
        class="mb-27"
      />
      <BaseInput
        v-model="RegistrationData.email"
        placeholder="Email*"
        :has-error="$v.RegistrationData.email.$error"
        class="mb-27"
      />
      <BaseInput
        v-model="RegistrationData.address"
        placeholder="Адрес*"
        :has-error="$v.RegistrationData.address.$error"
        class="mb-27"
      />
      <BaseInput
        v-model="RegistrationData.password"
        placeholder="Пароль*"
        :has-error="$v.RegistrationData.password.$error"
        class="mb-24"
      />
      <BaseInput
        v-model="RegistrationData.password_confirmation"
        placeholder="Подтвердите пароль*"
        :has-error="$v.RegistrationData.password_confirmation.$error"
        class="mb-27"
      />
      <div class="mt-24 flex items-center justify-between">
        <div class="flex flex-col mb-40">
          <div class="flex items-center relative mb-14">
            <input id="privacy" v-model="RegistrationData.agreement" type="checkbox" />
            <label class="text-14 leading-20 ml-12 cursor-pointer checkbox-label" for="privacy"
              >Я согласен на обработку персональных данных</label
            >
          </div>
          <div class="flex items-center relative">
            <input id="news" v-model="RegistrationData.subscribe" type="checkbox" />
            <label class="text-14 leading-20 ml-12 cursor-pointer checkbox-label" for="news"
              >Информирование о новинках и акциях</label
            >
          </div>
          <!--        <BaseCheckbox-->
          <!--          :id="'privacy'"-->
          <!--          v-model="RegistrationData.agreement"-->
          <!--          class="mb-14"-->
          <!--          :label="'Я согласен на обработку персональных данных'"-->
          <!--        />-->
          <!--        <BaseCheckbox :label="'Информирование о новинках и акциях'" v-model="RegistrationData.subscribe" :id="'news'"-->
          <!--        />-->
        </div>
      </div>
      <BaseButton type="submit">Войти</BaseButton>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { required, email, sameAs, numeric } from "vuelidate/lib/validators";
import RegistrationData from "../models/RegistrationData";
import { AuthService } from "../AuthService";
import AuthSubHeader from "@/modules/Auth/components/AuthSubHeader.vue";

const validations = () => {
  return {
    RegistrationData: {
      first_name: { required },
      second_name: { required },
      last_name: { required },
      phone: { required, numeric },
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

@Component({ components: { AuthSubHeader }, validations })
export default class AuthRegistration extends Vue {
  title: string = "Войдите в свой аккаунт";
  RegistrationData: RegistrationData = new RegistrationData();

  async register() {
    console.log(this.$v);
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    await this.$serviceLocator.getService(AuthService).register(this.RegistrationData);
  }
}
</script>

<style></style>
