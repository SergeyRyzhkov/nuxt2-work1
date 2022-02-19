<template>
  <main class="page-wrapper container">
    <BreadCrumbs class="hidden lg:block" />
    <div class="flex flex-col lg:flex-row">
      <section class="hidden w-full lg:block lg:w-1/4">
        <h1>Профиль</h1>
        <nav class="mt-30">
          <ul class="cabinet-menu">
            <li><nuxt-link :to="{ name: 'personal' }" exact>Личные данные</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'orders' }">Заказы</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'favorites' }">Избранное</nuxt-link></li>
            <li><a @click="cartModal()">Корзина</a></li>
            <li><a href="javascript:void(0)" @click="logout">Выйти</a></li>
          </ul>
        </nav>
      </section>

      <!-- Для мобилы. Костыль, но так быстрее -->
      <section v-show="navigatorVisible" class="mt-32 w-full lg:hidden">
        <h1>Профиль</h1>
        <nav class="mt-10">
          <ul>
            <li class="cursor-pointer py-16 pr-6">
              <nuxt-link :to="{ name: 'personal' }" exact class="flex items-center justify-between"
                ><span>Личные данные</span> <img src="/icons/right-arrow.svg" width="24" height="24"
              /></nuxt-link>
            </li>
            <li class="cursor-pointer border-t border-[#c9c9c9] py-16 pr-6">
              <nuxt-link :to="{ name: 'orders' }" class="flex items-center justify-between"
                ><span>Заказы</span><img src="/icons/right-arrow.svg" width="24" height="24"
              /></nuxt-link>
            </li>
            <li class="cursor-pointer border-t border-[#c9c9c9] py-16 pr-6">
              <nuxt-link :to="{ name: 'favorites' }" class="flex items-center justify-between"
                ><span>Избранное</span><img src="/icons/right-arrow.svg" width="24" height="24"
              /></nuxt-link>
            </li>
            <li class="cursor-pointer border-t border-[#c9c9c9] py-16 pr-6">
              <a class="flex items-center justify-between" @click="cartModal()"
                ><span>Корзина</span><img src="/icons/right-arrow.svg" width="24" height="24"
              /></a>
            </li>
            <li class="cursor-pointer border-t border-[#c9c9c9] py-16"><a href="javascript:void(0)" @click="logout">Выйти</a></li>
          </ul>
        </nav>
      </section>

      <nuxt-child></nuxt-child>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import CartModal from "../components/cart/CartModal.vue";
import AppStore from "@/modules/Root/store/AppStore";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import { AuthService } from "@/modules/Auth/AuthService";

@Component
export default class ProfilePage extends Vue {
  fetch() {
    this.updateBreadCrumbs();
  }

  get navigatorVisible() {
    return this.$route.name === "profile";
  }

  async logout() {
    await this.$serviceLocator.getService(AuthService).logout();
    this.$router.push({ name: "main" });
  }

  cartModal() {
    this.$modalManager.modalShowFullScreen(CartModal);
  }

  updateBreadCrumbs() {
    const breadCrumbList = [
      { linkName: "Главная", name: "main" },
      { linkName: "Профиль", name: "profile" },
    ];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }
}
</script>

<style lang="scss">
.cabinet-menu {
  > li {
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      color: $secondary;
    }
    a {
      &.router-link-exact-active {
        color: $secondary;
      }
    }
    + li {
      margin-top: 23px;
    }
  }
}
</style>
