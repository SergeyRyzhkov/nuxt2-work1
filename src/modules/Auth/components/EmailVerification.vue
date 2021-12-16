<template>
  <section>
    <h2 class="uppercase mb-20">Подтвердите почту</h2>
    <div class="mb-20 mb:mb-40">{{ loginData.email }}</div>
    <BaseInput
      v-model="code"
      placeholder="Код из почты"
      :has-error="$v.code.$error"
      :is-shake-error="true"
      @blur="$v.code.$touch()"
    ></BaseInput>
    <div v-show="!isSendEnabled" class="mt-20 text-14 text-gray-color">{{ resendDelayText }}</div>
    <div v-show="isSendEnabled" class="mt-20 text-14 cursor-pointer text-secondary" @click="resendCode()">
      Отправить код повторно
    </div>
    <BaseButton v-show="isSendEnabled" class="mt-40 md:mt-60" @click="verifyEmail">Отправить</BaseButton>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { required } from "vuelidate/lib/validators";
import LoginData from "../models/LoginData";
import { AuthService } from "@/modules/Auth/AuthService";

const validations = () => {
  return {
    code: { required },
  };
};

@Component({ validations })
export default class EmailVerification extends Vue {
  @Prop({ default: () => new LoginData() })
  loginData: LoginData;

  code: string = "";

  attemmptCount = 0;
  maxAttemptCount = 3;
  resendDelay = 20;

  get resendDelayText() {
    return `Отправить (запросить) код повторно можно через ${this.resendDelay} секунд`;
  }

  get isSendEnabled() {
    return this.attemmptCount < this.maxAttemptCount;
  }

  async verifyEmail() {
    this.$v.$reset();
    this.$v.$touch();
    if (!this.$v.$invalid && !!this.loginData) {
      const result = await this.$serviceLocator
        .getService(AuthService)
        // @ts-ignore
        .verifyEmail(this.loginData.email, this.loginData.password, this.code);
      if (result) {
        this.$emit("verify-success");
      } else {
        this.$emit("error", "Неверный код подтверждения !");
      }
    }
    this.checkAttemptAndStartTimer();
  }

  async resendCode() {
    this.checkAttemptAndStartTimer();
    if (!!this.loginData) {
      // @ts-ignore
      if (!(await this.$serviceLocator.getService(AuthService).resendVerifyEmail(this.loginData.email))) {
        this.$emit("error", "Не удалось выслать код подтверждения ! !");
      }
    }
  }

  checkAttemptAndStartTimer() {
    this.attemmptCount++;
    if (this.attemmptCount >= this.maxAttemptCount) {
      const timer = setInterval(() => {
        this.resendDelay--;
        if (this.resendDelay === 0) {
          this.attemmptCount = 0;
          this.resendDelay = 5;
          clearInterval(timer);
        }
      }, 1000);
    }
  }
}
</script>
