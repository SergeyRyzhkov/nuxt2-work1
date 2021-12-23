<template>
  <section class="w-2/4">
    <h3>Личные данные</h3>
    <div class="mt-22">
      <div>Персональные данные</div>
      <div class="mt-33">
        <form @submit.prevent="savePersonal">
          <BaseInput
            v-model="registrationData.fio"
            placeholder="ФИО*"
            class="mb-27"
            :has-error="$v.registrationData.fio.$error"
            @blur="$v.registrationData.fio.$touch()"
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
            @blur="$v.registrationData.address.$touch()"
            class="mb-32"
          />
          <BaseButton type="submit">Сохранить</BaseButton>
        </form>
      </div>
      <PasswordRecovery />
    </div>
  </section>
</template>

<script lang="ts">
import {Vue, Component} from "nuxt-property-decorator";
import {AuthService} from "@/modules/Auth/AuthService";
import {phoneMask} from "@/utils/InputMaskDefinitions";
import RegistrationData from "@/modules/Auth/models/RegistrationData";
import {email, required} from "vuelidate/lib/validators";

const validations = () => {
  return {
    registrationData: {
      fio: {required},
      phone: {required},
      email: {required, email},
      address: {required},
    },
  };
};

@Component({validations})
export default class PersonalData extends Vue {
  registrationData: RegistrationData = new RegistrationData();
  phoneMask = phoneMask;

  fetch() {
    this.registrationData = this.$serviceLocator.getService(AuthService).getSessionUser();
  }

  savePersonal() {
    this.$v.$touch()
    if (this.$v.$invalid) {
      return;
    }
    RegistrationData.buildFirstSecondPatrFromFio(this.registrationData);
    this.$serviceLocator.getService(AuthService).updateProfile(this.registrationData);
  }
}
</script>
