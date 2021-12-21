<template>
  <div class="w-full lg:w-1/2 mt-70 lg:mt-0">
    <div class="font-semibold">Наша служба поддержки клиентов готова ответить на любые запросы или жалобы.</div>
    <div class="mt-24 mb-34">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </div>
    <FeedbackForm :radio="true" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class ContactsForm extends Vue {}
</script>
