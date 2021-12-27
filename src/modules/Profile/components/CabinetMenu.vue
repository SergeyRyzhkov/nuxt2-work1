<template>
  <section>
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
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { AuthService } from "@/modules/Auth/AuthService";
import CartModal from "@/modules/Profile/components/cart/CartModal.vue";

@Component
export default class CabinetMenu extends Vue {
  async logout() {
    await this.$serviceLocator.getService(AuthService).logout();
    this.$router.push({ name: "main" });
  }

  cartModal() {
    this.$modalManager.modalShowFullScreen(CartModal);
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
