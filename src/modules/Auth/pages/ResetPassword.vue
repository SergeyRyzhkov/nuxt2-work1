<template>
  <div class="h-100"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { EmptyService } from "@/_core/service/EmptyService";

@Component
export default class ResetPassword extends Vue {
  @Prop()
  code;

  async mounted() {
    try {
      await this.$serviceLocator.getService(EmptyService).getAnyOrFail(`users/password/recover/${this.code}`);
    } catch (err) {
      console.log(err);
    }

    this.$router.push({ name: "personal" });
  }
}
</script>

<style lang="scss"></style>
