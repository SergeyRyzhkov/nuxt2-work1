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
      const result = await this.$serviceLocator.getService(EmptyService).getAnyOrFail(`users/password/recover/${this.code}`);
      console.log(result);
      this.$router.push({ name: "personal" });
    } catch (err) {
      this.$modalManager.showNotify("Не удалсоь восстановить пароль !");
      this.$router.push({ name: "main" });
    }
  }
}
</script>

<style lang="scss"></style>
