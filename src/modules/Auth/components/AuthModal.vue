<template>
  <main class="w-screen h-screen">
    <AuthForm class="float-right" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AuthForm from "./AuthForm.vue";

@Component({ components: { AuthForm } })
export default class AuthModal extends Vue {
}
</script>
