<template>
  <BaseInput v-model="search" placeholder="Искать товар" classes="header-search-input">
    <svg
      class="header-search-input__icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10.4298" cy="11" r="6.575" transform="rotate(-45 10.4298 11)" stroke="#16192C" stroke-width="1.6" />
      <path d="M15.1144 15.6846L18.9151 19.4853" stroke="#16192C" stroke-width="1.6" />
    </svg>
    <div v-if="search.length > 3" class="header-search-input-dropdown">
      <div class="dropdown-no-results hidden">
        <div class="request-string">По запросу "{{ search }}"</div>
        <div class="no-results">Нет результатов</div>
      </div>
      <div class="dropdown-results flex-wrap justify-between flex">
        <div v-for="i in 6" class="flex items-center">
          <figure class="dropdown-img">
            <img src="/images/FavoriteTestImage.png" alt="" itemprop="image" loading="lazy" />
            <figcaption></figcaption>
          </figure>
          <div class="pl-20 item-title">Сыворотка для лица KAYPRO Senshua с высокими омолаживающими...</div>
        </div>
      </div>
    </div>
    <div v-if="search.length > 3" class="dark"></div>
  </BaseInput>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class HeaderSearchInput extends Vue {
  search: string = "";
}
</script>

<style lang="scss">
.dropdown-no-results {
  .request-string {
    font-size: 14px;
    line-height: 22px;
  }
  .no-results {
    color: $text-gray;
    font-size: 14px;
    line-height: 22px;
  }
}
.dark {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.3;
  background: #131313;
}
.header-search-input {
  border-radius: 9999px !important;
  height: 46px;
  position: relative;
  padding: 8px 23px 8px 23px;
  border: 1px solid #dfdfdf !important;
  &-dropdown {
    z-index: 40;
    border-top: 2px solid #131313;
    position: absolute;
    height: auto;
    width: 100%;
    background: #ffffff;
    top: 62px;
    z-index: 1000;
    @apply px-22 pt-24 pb-42;
    .dropdown-img {
      width: 78px;
      height: 78px;
    }
    .dropdown-results {
      > div {
        width: calc(50% - 24px);
        font-weight: normal;
        cursor: pointer;
      }
      > div + div {
        margin-bottom: 16px;
      }
    }
    .item-title {
      font-size: 14px;
      line-height: 17px;
    }
  }
  &__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 14px;
  }
}
</style>
