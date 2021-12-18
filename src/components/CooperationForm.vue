<template>
  <base-modal :back-enabled="false" class="flex flex-col p-20 md:p-40 pb-10 md:pb-20" @close="$emit('close')">
    <h1>Заполните форму для сотрудничества <br />с KAYPRO и мы с Вами свяжемся!</h1>
    <FeedbackForm class="mt-40 md:mt-60"></FeedbackForm>
  </base-modal>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class CooperationForm extends Vue {}
</script>
