<template>
  <BaseModalFullScreen :back-enabled="!loginRegFormVisible" @go-back="onGoBack()" @close="$emit('close')">
    <template #header-center>
      <div v-if="errorMessage" class="ml-auto border-secondary border border-solid text-secondary p-20 text-14">
        <span>{{ errorMessage }}</span>
      </div>
    </template>
    <template #right-side>
      <div class="xl:px-60 h-full overflow-y-auto">
        <LoginRegistrationForm
          v-if="loginRegFormVisible"
          @reset-clicked="resetPasswordClicked()"
          @need-verify-email="onNeedVerifyEmail"
          @login-success="onLoginSuccess"
          @registration-success="onRegistrationSuccess"
          @error="onError"
        ></LoginRegistrationForm>
        <PasswordReset
          v-if="resetPasswordVisible"
          :email="loginData.email"
          @error="onError"
          @reset-success="onResetSuccess()"
        ></PasswordReset>
        <EmailVerification
          v-if="emailVerification"
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
    this.loginRegFormVisible = false;
    this.emailVerification = false;
    this.resetPasswordVisible = true;
  }

  onNeedVerifyEmail(loginData: LoginData) {
    this.loginData = loginData;
    this.loginRegFormVisible = false;
    this.resetPasswordVisible = false;
    this.emailVerification = true;
  }

  onRegistrationSuccess(loginData: LoginData) {
    this.loginData = loginData;
    this.loginRegFormVisible = false;
    this.resetPasswordVisible = false;
    this.emailVerification = true;
  }

  onResetSuccess() {
    this.loginRegFormVisible = true;
    this.resetPasswordVisible = false;
    this.emailVerification = false;
  }

  onVerifySuccess() {
    this.$emit("close");
  }

  onLoginSuccess() {
    this.$emit("close");
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
