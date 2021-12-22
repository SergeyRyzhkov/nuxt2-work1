<template>
  <nav class="flex flex-col">
    <ul class="header-menu-list">
      <li><span v-click-outside="closeCatalogMenu" class="p-16" @click="$emit('toogleCatalogMenu')">Каталог</span></li>
      <li><nuxt-link :to="{ name: 'training' }">Обучение парикмахеров</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'cooperation' }">Сотрудничество</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'news' }">Новости</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'contacts' }">Контакты</nuxt-link></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class HeaderMenu extends Vue {
  closeCatalogMenu() {
    this.$emit("closeCatalogMenu");
  }
}
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
    > a {
      padding: 16px;
    }

    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
  }
  > li + li {
    margin-left: 46px;
  }
}
</style>
