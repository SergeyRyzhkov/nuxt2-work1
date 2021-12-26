<template>
  <div class="flex items-center">
    <img src="/images/header_heart.svg" width="24" height="24" class="cursor-pointer" @click="gotoFavor()" />
    <img src="/images/header_shop.svg" width="22" height="22" class="ml-24 lg:ml-48 cursor-pointer" @click="cartModal()" />
    <img
      src="/images/header_user.svg"
      width="19"
      height="19"
      class="ml-24 lg:ml-48 cursor-pointer"
      @click="authModalOrProfile()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AuthForm from "@/modules/Auth/components/AuthForm.vue";
import CartModal from "@/modules/Profile/components/cart/CartModal.vue";
import { AuthService } from "@/modules/Auth/AuthService";

@Component({ components: { AuthForm } })
export default class HeaderUser extends Vue {
  authModalOrProfile() {
    if (this.$serviceLocator.getService(AuthService).isAuthenticated) {
      this.$router.push({ name: "profile" });
    } else {
      this.$modalManager.modalShowFullScreen(AuthForm);
    }
  }

  cartModal() {
    this.$modalManager.modalShowFullScreen(CartModal);
  }

  gotoFavor() {
    if (this.$route.name !== "favorites") {
      this.$router.push({ name: "favorites" });
    }
  }

  get userName() {
    return this.$serviceLocator.getService(AuthService).getSessionUser().first_name;
  }
}
</script>
