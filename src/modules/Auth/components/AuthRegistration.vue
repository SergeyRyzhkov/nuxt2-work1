<template>
  <div>
    <AuthSubHeader :title="title" :tabsVisible="true" :isActive="'registration'"
                   @setFormType="(type) => $emit('setFormType', type)"/>
    <form @submit.prevent="register"></form>
    <BaseInput placeholder="ФИО*" v-model="RegistrationData.first_name" class="mb-27"/>
    <BaseInput placeholder="Телефон*" class="mb-27" v-model="RegistrationData.phone"/>
    <BaseInput placeholder="Email*" class="mb-27" v-model="RegistrationData.email"/>
    <BaseInput placeholder="Адрес*" class="mb-27" v-model="RegistrationData.address"/>
    <BaseInput placeholder="Пароль*" class="mb-24" v-model="RegistrationData.password"/>
    <BaseInput placeholder="Подтвердите пароль*" class="mb-27" />
    <div class="mt-24 flex items-center justify-between">
      <div class="flex flex-col mb-40">
        <BaseCheckbox
          :id="'privacy'"
          class="mb-14"
          :label="'Я согласен на обработку персональных данных'"
        />
        <BaseCheckbox :label="'Информирование о новинках и акциях'" :id="'news'"
        />
      </div>
    </div>
    <BaseButton type="submit">Войти</BaseButton>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from "nuxt-property-decorator";
import AuthSubHeader from "@/modules/Auth/components/AuthSubHeader.vue"
import RegistrationData from "../models/RegistrationData";
import {AuthService} from "../AuthService";
import {required, email} from "vuelidate/lib/validators";

const validations = () => {
  return {
    RegistrationData: {
      first_name: {required},
      last_name: {required},
      phone: {required},
      email: {required, email},
      password:{required},
      address:{required}
    }
  }

}


@Component({components: {AuthSubHeader}})
export default class AuthRegistration extends Vue {
  title: string = 'Войдите в свой аккаунт';
  RegistrationData: RegistrationData = new RegistrationData();

  async register() {
    const regData = new RegistrationData({
      first_name: "Sergey",
      last_name: "Ryzhkov",
      phone: "79218941537",
      email: "sergeyryzhkov76@gmail.com",
      password: "sergeyryzhkov76@gmail.com",
      address: "Spb",
    });
    await this.$serviceLocator.getService(AuthService).register(regData);
  }
}
</script>

<style></style>
