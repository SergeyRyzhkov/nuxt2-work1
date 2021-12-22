<template>
  <section class="w-2/4">
    <h3>Личные данные</h3>
    <div class="mt-22">
      <div>Персональные данные</div>
      <div class="mt-33">
        <form @submit.prevent="savePersonal">
          <BaseInput v-model="registrationData.fio" placeholder="ФИО*" class="mb-27" />
          <div class="flex items-center">
            <BaseInput v-model="registrationData.phone" placeholder="Телефон*" type="tel" :mask="phoneMask" class="mb-27 pr-16" />
            <BaseInput placeholder="Email*" class="mb-27 pl-16" />
          </div>
          <BaseInput v-model="registrationData.address" placeholder="Адрес доставки*" class="mb-32" />
          <BaseButton type="submit">Сохранить</BaseButton>
        </form>
      </div>

      <div class="mt-62">Смена пароля</div>
      <form class="mt-33" @submit.prevent="changePassword">
        <BaseInput v-model="registrationData.oldPassword" placeholder="Старый пароль*" type="password" class="mb-27" />
        <BaseInput v-model="registrationData.password" placeholder="Новый пароль*" type="password" class="mb-27" />
        <BaseInput
          v-model="registrationData.password_confirmation"
          placeholder="Повторите пароль*"
          type="password"
          class="mb-32"
        />
        <BaseButton type="submit">Изменить</BaseButton>
      </form>
      <div class="flex items-center mt-60">
        <BaseCheckbox id="subscribe" label="Получать информацию о новинках и акциях" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { AuthService } from "@/modules/Auth/AuthService";
import { phoneMask } from "@/utils/InputMaskDefinitions";
import RegistrationData from "@/modules/Auth/models/RegistrationData";

@Component
export default class PersonalData extends Vue {
  registrationData: RegistrationData = new RegistrationData();
  phoneMask = phoneMask;

  fetch() {
    this.registrationData = this.$serviceLocator.getService(AuthService).getSessionUser();
  }

  changePassword() {
    this.$serviceLocator.getService(AuthService).updatePassword(this.registrationData);
  }

  savePersonal() {
    RegistrationData.buildFirstSecondPatrFromFio(this.registrationData);
    this.$serviceLocator.getService(AuthService).updateProfile(this.registrationData);
  }
}
</script>
