<template>
  <div>
    <div class="mt-62">Смена пароля</div>
    <form class="mt-33" @submit.prevent="changePassword">
      <BaseInput
        v-model="registrationData.oldPassword"
        placeholder="Старый пароль*"
        type="password"
        class="mb-27"
        :has-error="$v.registrationData.oldPassword.$error"
        @blur="$v.registrationData.oldPassword.$touch()"
      />
      <BaseInput
        v-model="registrationData.password"
        placeholder="Новый пароль*"
        type="password"
        class="mb-27"
        :has-error="$v.registrationData.password.$error"
        @blur="$v.registrationData.password.$touch()"
      />
      <BaseInput
        v-model="registrationData.password_confirmation"
        placeholder="Повторите пароль*"
        :has-error="$v.registrationData.password_confirmation.$error"
        @blur="$v.registrationData.password_confirmation.$touch()"
        type="password"
        class="mb-32"
      />
      <BaseButton type="submit">Изменить</BaseButton>
    </form>
    <div class="flex items-center mt-60">
      <BaseCheckbox id="subscribe" label="Получать информацию о новинках и акциях"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {AuthService} from "@/modules/Auth/AuthService";
import RegistrationData from "@/modules/Auth/models/RegistrationData";
import {email, required, sameAs} from "vuelidate/lib/validators";

const validations = () => {
  return {
    registrationData: {
      oldPassword: { required },
      password: { required },
      password_confirmation: { required, sameAsPassword: sameAs("password") },
    },
  };
};

@Component({validations})
export default class PasswordRecovery extends Vue{
  registrationData: RegistrationData = new RegistrationData();

  changePassword() {
    this.$v.$touch()
    if (this.$v.$invalid) {
      return;
    }
    this.$serviceLocator.getService(AuthService).updatePassword(this.registrationData);
  }
}
</script>

