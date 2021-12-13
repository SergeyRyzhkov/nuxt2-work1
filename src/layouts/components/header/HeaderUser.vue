<template>
  <div class="flex items-center">
    <img src="/images/header_heart.svg" loading="lazy" width="24" height="24" />
    <img src="/images/header_shop.svg" loading="lazy" width="22" height="22" class="ml-24 lg:ml-48" />
    <img
      src="/images/header_user.svg"
      loading="lazy"
      width="19"
      height="19"
      class="ml-24 lg:ml-48 cursor-pointer"
      @click="authModal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AuthModal from "@/modules/Auth/components/AuthModal.vue";

@Component({components: {AuthModal}})
export default class HeaderUser extends Vue {

  authModal() {
    this.$modalManager.modalShow(AuthModal)
  }
}
</script>
