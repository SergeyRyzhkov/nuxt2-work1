<template>
  <BaseModalFullScreen :back-enabled="!loginRegFormVisible" @go-back="onGoBack()" @close="$emit('close')">
    <template #header-center>
      <div v-show="errorMessage" class="border-secondary text-14 text-secondary ml-auto border border-solid p-20">
        <span>{{ errorMessage }}</span>
      </div>
    </template>
    <template #right-side>
      <div class="h-full overflow-y-auto pb-20 xl:px-40">
        <LoginRegistrationForm
          v-show="loginRegFormVisible"
          @reset-clicked="resetPasswordClicked()"
          @need-verify-email="onNeedVerifyEmail"
          @login-success="onLoginSuccess"
          @registration-success="onRegistrationSuccess"
          @error="onError"
        ></LoginRegistrationForm>
        <PasswordReset
          v-show="resetPasswordVisible"
          :email="loginData.email"
          @error="onError"
          @reset-success="onResetSuccess()"
        ></PasswordReset>
        <EmailVerification
          v-show="emailVerification"
          :login-data="loginData"
          @error="onError"
          @verify-success="onVerifySuccess()"
        ></EmailVerification>
      </div>
    </template>
  </BaseModalFullScreen>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import LoginData from "../models/LoginData";

@Component
export default class AuthForm extends Vue {
  loginRegFormVisible = true;
  resetPasswordVisible = false;
  emailVerification = false;
  errorMessage: string | null = null;

  loginData: LoginData = new LoginData();

  resetPasswordClicked() {
    this.errorMessage = null;
    this.loginRegFormVisible = false;
    this.emailVerification = false;
    this.resetPasswordVisible = true;
  }

  onNeedVerifyEmail(loginData: LoginData) {
    this.errorMessage = null;
    this.loginData = loginData;
    this.loginRegFormVisible = false;
    this.resetPasswordVisible = false;
    this.emailVerification = true;
  }

  onRegistrationSuccess(loginData: LoginData) {
    this.errorMessage = null;
    this.loginData = loginData;
    this.loginRegFormVisible = false;
    this.resetPasswordVisible = false;
    this.emailVerification = true;
    this.$router.push({ name: "personal" });
  }

  onResetSuccess() {
    this.errorMessage = null;
    this.loginRegFormVisible = true;
    this.resetPasswordVisible = false;
    this.emailVerification = false;

    this.$modalManager.showNotify("Письмо для восстановление пароля отправлено на почту");
    this.$emit("close");
  }

  onVerifySuccess() {
    this.errorMessage = null;
    this.$emit("close");
    this.$router.push({ name: "personal" });
  }

  onLoginSuccess() {
    this.errorMessage = null;
    this.$emit("close");
    this.$router.push({ name: "personal" });
  }

  onGoBack() {
    this.resetPasswordVisible = false;
    this.emailVerification = false;
    this.loginRegFormVisible = true;
  }

  onError(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}
</script>
1001
