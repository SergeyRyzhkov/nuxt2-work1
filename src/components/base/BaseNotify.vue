<template>
  <BaseModal :back-enabled="false" class="flex" @close="$emit('close')">
    <div class="mt-24 flex flex-col m-auto items-center">
      <img src="/icons/alert_check.svg" width="74" height="74" />
      <div class="mb-40 mt-60 m-auto text-24">{{ text }}</div>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class BaseNotify extends Vue {
  @Prop({ default: "Выполнено !" })
  text: string;

  @Prop({ default: true })
  autoClose: boolean;

  @Prop({ default: 2200 })
  closeInterval: number;

  mounted() {
    if (this.autoClose) {
      setTimeout(() => {
        this.$emit("close");
      }, this.closeInterval);
    }
  }
}
</script>
