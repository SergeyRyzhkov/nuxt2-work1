<template>
  <BaseModal :back-enabled="false" class="flex" @close="$emit('close')">
    <div class="m-auto mt-24 flex flex-col items-center">
      <img src="/icons/alert_check.svg" width="74" height="74" />
      <div class="m-auto mb-40 mt-60 text-24">{{ text }}</div>
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
