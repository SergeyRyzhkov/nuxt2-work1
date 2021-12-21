<template>
  <div>
    <ul class="footer-ul">
      <li>О КОМПАНИИ</li>
      <li>
        <nuxt-link :to="{ name: 'about' }">О нас</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{ name: 'news' }">Новости</nuxt-link>
      </li>
      <li>Договор-оферта</li>
      <li>Реквизиты</li>
      <li>Пользовательское <br />соглашение</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class FooterAbout extends Vue {}
</script>
