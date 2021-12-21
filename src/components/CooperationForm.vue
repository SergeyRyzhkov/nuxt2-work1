<template>
  <base-modal :back-enabled="false" class="flex flex-col p-20 md:p-40 pb-10 md:pb-20" @close="$emit('close')">
    <h1>Заполните форму для сотрудничества <br />с KAYPRO и мы с Вами свяжемся!</h1>
    <p class="text-14 mt-16">
      Компания Аккорд - эксклюзивный представитель итальянской <br />
      профессиональной косметики для волос KAYPRO на территории РФ. <br />Для каждого из Вас у нас есть особые условия
      сотрудничества!
    </p>
    <FeedbackForm class="mt-20 md:mt-40"></FeedbackForm>
  </base-modal>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class CooperationForm extends Vue {}
</script>
