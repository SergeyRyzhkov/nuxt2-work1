<template>
  <div>
    <ul class="footer-ul">
      <li>ИНФОРМАЦИЯ</li>
      <li><nuxt-link :to="{ name: 'documents' }">Помощь</nuxt-link></li>
      <li>
        <nuxt-link :to="{ name: 'faq' }">Вопрос-ответ</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{ name: 'documents' }">Условия оплаты</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{ name: 'documents' }">Условия доставки</nuxt-link>
      </li>

      <li><nuxt-link :to="{ name: 'documents' }">Гарантия на товар</nuxt-link></li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class FooterInfo extends Vue {}
</script>
