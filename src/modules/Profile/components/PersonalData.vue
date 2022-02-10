<template>
  <section class="w-full">
    <h3 class="hidden lg:block">Личные данные</h3>

    <div class="mb-38 mt-32 flex items-center lg:hidden">
      <img class="cursor-pointer" src="/icons/left-arrow.svg" width="24" height="24" @click="$router.push({ name: 'profile' })" />
      <h3 class="mx-auto">Личные данные</h3>
    </div>

    <div class="mt-22 w-full lg:w-1/2">
      <div>Персональные данные</div>
      <div class="mt-33">
        <form @submit.prevent="savePersonal">
          <BaseInput
            v-model="registrationData.last_name"
            placeholder="Фамилия*"
            class="mb-27"
            :has-error="$v.registrationData.last_name.$error"
            @blur="$v.registrationData.last_name.$touch()"
          />
          <BaseInput
            v-model="registrationData.first_name"
            placeholder="Имя*"
            class="mb-27"
            :has-error="$v.registrationData.first_name.$error"
            @blur="$v.registrationData.first_name.$touch()"
          />
          <BaseInput
            v-model="registrationData.patronymic"
            placeholder="Отчество*"
            class="mb-27"
            :has-error="$v.registrationData.patronymic.$error"
            @blur="$v.registrationData.patronymic.$touch()"
          />
          <div class="flex items-center">
            <BaseInput
              v-model="registrationData.phone"
              placeholder="Телефон*"
              type="tel"
              :mask="phoneMask"
              class="mb-27 pr-16"
              :has-error="$v.registrationData.phone.$error"
              @blur="$v.registrationData.phone.$touch()"
            />
            <BaseInput
              v-model="registrationData.email"
              placeholder="Email*"
              class="mb-27 pl-16"
              :has-error="$v.registrationData.email.$error"
              @blur="$v.registrationData.email.$touch()"
            />
          </div>
          <BaseInput
            v-model="registrationData.address"
            placeholder="Адрес доставки*"
            :has-error="$v.registrationData.address.$error"
            class="mb-32"
            @blur="$v.registrationData.address.$touch()"
          />
          <BaseButton type="submit">Сохранить</BaseButton>
        </form>
      </div>
      <PasswordRecovery />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { email, required } from "vuelidate/lib/validators";
import { AuthService } from "@/modules/Auth/AuthService";
import { phoneMask } from "@/utils/InputMaskDefinitions";
import RegistrationData from "@/modules/Auth/models/RegistrationData";

const validations = () => {
  return {
    registrationData: {
      first_name: { required },
      last_name: { required },
      patronymic: { required },
      phone: { required },
      email: { required, email },
      address: { required },
    },
  };
};

@Component({ validations })
export default class PersonalData extends Vue {
  registrationData: RegistrationData = new RegistrationData();
  phoneMask = phoneMask;

  fetch() {
    this.registrationData = this.$serviceLocator.getService(AuthService).getSessionUser();
  }

  savePersonal() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    this.$serviceLocator.getService(AuthService).updateProfile(this.registrationData);
  }
}
</script>
