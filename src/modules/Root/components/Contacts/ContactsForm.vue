<template>
  <div class="mt-60 w-full md:mt-70 lg:mt-0 lg:w-1/2">
    <div class="font-semibold">Наша служба поддержки клиентов готова ответить на любые запросы или жалобы.</div>
    <div class="mb-34 mt-24 text-14">
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
