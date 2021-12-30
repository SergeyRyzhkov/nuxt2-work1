<template>
  <div>
    <header class="flex p-16 items-center">
      <div v-click-outside="closeMenu" class="menu-toogler" @click="openMenu()">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <header-logo class="ml-30"></header-logo>
      <div class="ml-auto">icons</div>
    </header>

    <div class="mobile-menu__wrapper" :class="{ active: menuOpened === true }"></div>

    <ul class="mobile-menu-list" :class="{ active: menuOpened === true }">
      <li class="bg-light-gray">Личный кабинет</li>
      <li><nuxt-link :to="{ name: 'catalog' }">Каталог</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'training' }">Обучение парикмахеров</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'cooperation' }">Сотрудничество</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'news' }">Новости</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'contacts' }">Контакты</nuxt-link></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class TheMobileHeader extends Vue {
  menuOpened = false;

  openMenu() {
    this.menuOpened = true;
  }

  closeMenu() {
    this.menuOpened = false;
  }
}
</script>

<style lang="scss">
.menu-toogler {
  display: block;
  position: relative;
  height: 42px;
  width: 40px;
  cursor: pointer;
  > span {
    background: $secondary;
    display: block;
    height: 3px;
    width: 42px;
    position: absolute;
    top: 0;
    transition: 0.5s;
  }

  > span:nth-child(2) {
    top: 13px;
  }

  > span:nth-child(3) {
    top: 26px;
  }
}

.mobile-menu__wrapper {
  z-index: 1000;
  &.active {
    position: fixed;
    display: block;
    top: 0px;
    left: 0px;
    min-width: 100%;
    width: 100vw;
    min-height: 100%;
    height: 100vh;
    background-color: $primary;
    opacity: 0.7;
  }
}
.mobile-menu-list {
  background: white;
  visibility: hidden;
  transform: translateX(-100%);
  box-sizing: border-box;
  position: fixed;
  top: 0px;
  left: 0px;
  flex-direction: column;
  background-color: white;
  height: 100vh;
  // max-height: calc(100vh - 60px);
  overflow-y: auto;
  z-index: 2147483678;
  transform-style: flat;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  width: 90vw;

  &.active {
    visibility: visible;
    transform: none;
  }

  li {
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    a {
      padding: 20px !important;
      border-bottom: none;
    }
    &:hover {
      color: $secondary;
    }
  }

  li + li {
    border-top: 1px solid #c9c9c9;
  }
}
</style>
