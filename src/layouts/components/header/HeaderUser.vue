<template>
  <div class="flex items-center">
    <img src="/images/header_heart.svg" width="24" height="24" class="cursor-pointer" alt="" @click="gotoFavor()" />
    <div class="relative">
      <img
        src="/images/header_shop.svg"
        width="22"
        height="22"
        class="ml-24 cursor-pointer lg:ml-48"
        alt=" "
        @click="cartModal()"
      />
      <div class="shopping-cart-counter pl-1">{{ cartItemsCount }}</div>
    </div>
    <img
      src="/images/header_user.svg"
      alt=" "
      width="19"
      height="19"
      class="ml-24 cursor-pointer lg:ml-48"
      @click="authModalOrProfile()"
    />
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import AuthForm from "@/modules/Auth/components/AuthForm.vue";
import CartModal from "@/modules/Profile/components/cart/CartModal.vue";
import { AuthService } from "@/modules/Auth/AuthService";
import CartStore from "@/modules/Profile/store/CartStore";

@Component({ components: { AuthForm } })
export default class HeaderUser extends Vue {
  get cartItemsCount() {
    return getModule(CartStore, this.$store).userCartCount;
  }

  get isAuthenticated() {
    return this.$serviceLocator.getService(AuthService).isAuthenticated;
  }

  authModalOrProfile() {
    if (this.isAuthenticated) {
      this.$router.push({ name: "personal" });
    } else {
      this.$modalManager.modalShowFullScreen(AuthForm);
    }
  }

  cartModal() {
    this.$modalManager.modalShowFullScreen(CartModal);
  }

  gotoFavor() {
    if (this.isAuthenticated) {
      if (this.$route.name !== "favorites") {
        this.$router.push({ name: "favorites" });
      }
    } else {
      this.$modalManager.showNotify("Войдите в свой аккаунт или зарегистрируйтесь !");
    }
  }
}
</script>
