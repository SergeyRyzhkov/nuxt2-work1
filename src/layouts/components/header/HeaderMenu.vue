<template>
  <nav class="flex flex-col">
    <ul class="header-menu-list">
      <li v-click-outside="closeCatalogMenu" class="header-menu-list--catalog" @click="toogle()">
        <span class="py-16">Каталог</span>
        <BaseOpenCloseButton
          width="13"
          height="13"
          stroke="white"
          :class="[isOpened ? 'active' : '']"
          class="dont_outside"
        ></BaseOpenCloseButton>
      </li>
      <li><nuxt-link :to="{ name: 'training' }">Обучение парикмахеров</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'cooperation' }">Сотрудничество</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'news' }">Новости</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'contacts' }">Контакты</nuxt-link></li>
    </ul>
    <LazyHydrate when-idle>
      <CatalogMenu :menu-visible="isOpened"></CatalogMenu>
    </LazyHydrate>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import LazyHydrate from "vue-lazy-hydration";

@Component({
  components: {
    LazyHydrate,
  },
})
export default class HeaderMenu extends Vue {
  isOpened = false;

  toogle() {
    this.isOpened = !this.isOpened;
  }

  closeCatalogMenu() {
    this.isOpened = false;
  }
}
</script>

<style lang="scss">
.header-menu-list {
  @apply text-14 font-semibold text-white;
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
    margin-left: 42px;
  }
  &--catalog {
    display: flex !important;
    align-items: center;
    > span {
      padding-right: 4px;
    }
    > button {
      padding: 5px;
      transition: all 0.1s ease-in-out;
      &.active {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
