<template>
  <nav class="flex flex-col">
    <ul class="header-menu-list">
      <li>Каталог</li>
      <li><nuxt-link :to="{ name: 'training' }">Обучение парикмахеров</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'cooperation' }">Сотрудничество</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'news' }">Новости</nuxt-link></li>
      <li>Контакты</li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class HeaderMenu extends Vue {}
</script>

<style lang="scss">
.header-menu-list {
  @apply text-white text-14 font-semibold;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  line-height: 17px;
  text-transform: uppercase;
  margin: auto;
  > li {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
  }
  > li + li {
    margin-left: 46px;
  }
}
</style>
