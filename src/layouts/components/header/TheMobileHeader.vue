<template>
  <div>
    <div class="container-fluid text-sm z-50 h-[43px] bg-primary"></div>
    <header class="flex h-[63px] items-center justify-between p-16">
      <div class="flex items-center">
        <div class="menu-toogler" :class="{ active: menuOpened }" @click="menuToggle()">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <header-logo class="ml-20"></header-logo>
      </div>
      <div class="flex items-center">
        <div @click="mobileSearch">
          <img v-lazysrc="'/images/mobile-search.svg'" width="28" height="28" class="cursor-pointer" />
        </div>
        <HeaderUser class="ml-20 flex-shrink-0"></HeaderUser>
      </div>
    </header>
    <div class="mobile-menu-list w-screen" :class="{ active: menuOpened === true }">
      <ul class="mt-10">
        <li><nuxt-link :to="{ name: 'catalog' }">Каталог</nuxt-link></li>
        <li><nuxt-link :to="{ name: 'training' }">Обучение парикмахеров</nuxt-link></li>
        <li><nuxt-link :to="{ name: 'cooperation' }">Сотрудничество</nuxt-link></li>
        <li><nuxt-link :to="{ name: 'news' }">Новости</nuxt-link></li>
        <li><nuxt-link :to="{ name: 'contacts' }">Контакты</nuxt-link></li>
      </ul>
    </div>
    <div class="mobile-block" :class="{ active: searchOpened }">
      <HeaderSearchInput class="mt-16" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class TheMobileHeader extends Vue {
  menuOpened = false;
  searchOpened = false;

  mobileSearch() {
    this.searchOpened = !this.searchOpened;
    this.changeOverflow(this.searchOpened);
  }

  changeOverflow(value: boolean) {
    const overflow = document.getElementsByTagName("html")[0];
    if (value) {
      overflow.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      overflow.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  }

  menuToggle() {
    this.menuOpened = !this.menuOpened;
    this.changeOverflow(this.menuOpened);
  }
}
</script>

<style lang="scss">
.mobile-block {
  background: #ffffff;
  position: fixed;
  border-top: 1px solid #f5f5f5;
  top: 106px;
  left: 0;
  height: 0;
  overflow: hidden;
  transition: 0.2s ease;
  z-index: 1;
  width: 100%;
  visibility: hidden;
  &.active {
    visibility: visible;
    height: calc(100vh - 106px);
    z-index: 1000;
  }
}
.menu-toogler {
  cursor: pointer;
  &.active {
    > span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 4px);
    }
    > span:nth-child(2) {
      transform: translateX(-50px);
    }
    > span:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -5px);
    }
  }
  > span {
    background: $primary;
    height: 2px;
    width: 22px;
    display: block;
    transition: 0.5s;
    border-radius: 3px;
  }

  > span:nth-child(2) {
    margin-top: 5px;
  }

  > span:nth-child(3) {
    margin-top: 5px;
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
  visibility: hidden;
  transform: translateX(-100%);
  box-sizing: border-box;
  position: fixed;
  top: 106px;
  left: 0px;
  flex-direction: column;
  background-color: white;
  height: 100vh;
  overflow-y: auto;
  z-index: 2147483678;
  transform-style: flat;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  &.active {
    visibility: visible;
    transform: none;
  }
  ul {
    li {
      font-size: 16px;
      line-height: 20px;
      cursor: pointer;
      a {
        padding: 10px !important;
        border-bottom: none;
      }
      &:hover {
        color: $secondary;
      }
    }
  }
}
</style>
