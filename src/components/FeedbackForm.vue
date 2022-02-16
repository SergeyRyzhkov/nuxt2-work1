<template>
  <form @submit.prevent="send">
    <div v-if="radio" class="mb-32 flex w-full justify-between sm:w-auto sm:justify-start">
      <BaseRadioButton v-model="formModel.type" label="Обращение" value="appeal" />
      <BaseRadioButton v-model="formModel.type" class="sm:ml-74" label="Запрос технологу" value="request" />
    </div>
    <BaseInput
      v-model="formModel.name"
      placeholder="ФИО*"
      :has-error="$v.formModel.name.$error"
      class="mb-27"
      @blur="$v.formModel.name.$touch()"
    />
    <div class="flex flex-col md:flex-row">
      <BaseInput
        v-model="formModel.phone"
        type="tel"
        placeholder="Телефон*"
        :mask="phoneMask"
        :has-error="$v.formModel.phone.$error"
        class="mb-27"
        @blur="$v.formModel.phone.$touch()"
      />
      <BaseInput
        v-model="formModel.email"
        placeholder="Email*"
        :has-error="$v.formModel.email.$error"
        class="mb-27 md:ml-32"
        @blur="$v.formModel.email.$touch()"
      />
    </div>

    <div class="flex flex-col md:flex-row">
      <BaseInput
        v-model="formModel.city"
        placeholder="Из какого вы города*"
        class="mb-27"
        :has-error="$v.formModel.city.$error"
        @blur="$v.formModel.city.$touch()"
      />
      <BaseMultiSelect
        v-model="formModel.area"
        placeholder="Сфера деятельности*"
        :options="areaOptions"
        class="mb-27 md:ml-32"
        :has-error="$v.formModel.area.$error"
        @blur="$v.formModel.area.$touch()"
      >
      </BaseMultiSelect>
    </div>

    <BaseInput
      v-model="formModel.comment"
      :placeholder="commentRequered ? 'Комментарий*' : 'Комментарий'"
      :has-error="commenttHasErrorExpr"
      class="mb-27"
      @blur="onCommentBlur()"
    />

    <BaseButton type="submit" class="mt-20 md:mt-40">Отправить</BaseButton>

    <p class="text-12 text-gray-color mt-16 -mb-32 md:mt-32">
      Защита от спама reCAPTCHA
      <a class="inline underline focus:no-underline" href="https://policies.google.com/privacy" target="_blank"
        >Конфиденциальность
      </a>
      и
      <a class="inline underline focus:no-underline" href="https://policies.google.com/terms" target="_blank"
        >Условия использования</a
      >
    </p>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { email, required } from "vuelidate/lib/validators";
import { phoneMask } from "@/utils/InputMaskDefinitions";
import { EmptyService } from "@/_core/service/EmptyService";
import { BaseViewModel } from "@/_core/models/BaseViewModel";
import { executeAction, loadReCaptchaScript } from "@/utils/ReCaptcha";

class FeedbackModel extends BaseViewModel {
  name = "";
  phone = "";
  email = "";
  comment = "";
  agreement = 1;
  area: any = null;
  city = "";
  type: "support" | "appeal" | "request" | "cooperation" = "appeal";
  recaptchaToken = "";
}

const validations = () => {
  return {
    formModel: {
      name: { required },
      city: { required },
      phone: { required },
      area: { required },
      comment: { required },
      email: { required, email },
    },
  };
};

@Component({ validations })
export default class FeedbackForm extends Vue {
  formModel: FeedbackModel = new FeedbackModel();
  phoneMask = phoneMask;

  @Prop({ default: false })
  radio: boolean;

  @Prop({ default: true })
  commentRequered: boolean;

  mounted() {
    loadReCaptchaScript(this.$config.reCaptchaSiteKey);
  }

  get commenttHasErrorExpr() {
    return this.commentRequered ? this.$v?.formModel?.comment?.$error : false;
  }

  onCommentBlur() {
    if (this.commentRequered) {
      this.$v?.formModel?.comment?.$touch();
    }
  }

  async send() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }

    const recaptchaToken = await executeAction(this.$config.reCaptchaSiteKey, "FeedbackForm");
    if (!!recaptchaToken) {
      this.formModel.recaptchaToken = recaptchaToken;
      this.formModel.area = this.formModel?.area?.name;
      this.formModel.phone = `+${this.formModel.phone}`;
      try {
        await this.$serviceLocator.getService(EmptyService).apiRequest.post("/users/feedback", this.formModel);
        this.$modalManager.showNotify("Сообщение отправлено !");
        this.formModel = new FeedbackModel();
      } catch (err: any) {
        this.$modalManager.showError("Не удалось отправить сообщение!");
      }
    } else {
      this.$modalManager.showError("Вы бот !");
    }
    this.$emit("close");
  }

  areaOptions = [
    { id: 1, name: "Мастер-парикмахер" },
    { id: 2, name: "Салон красоты" },
    { id: 3, name: "Школа парикмахеров" },
    { id: 4, name: "Магазин проф. косметики" },
    { id: 5, name: "Дистрибьютор в регионе" },
    { id: 6, name: "Оптовая фирма" },
  ];
}
</script>
