<template>
<section>
  <label :for="id" class="radio">
    <input :id="id"  type="radio" :name="name" class="hidden" :value="value"
           v-bind="{ ...$attrs }"
           v-on="{
        ...$listeners,
        input: (event) => onInput(event),
      }"
    />
    <span class="label"></span>{{ label }}
  </label>
</section>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";
@Component
export default class BaseRadio extends Vue{
  @Prop()
  name: string;

  @Prop()
  id: number;

  @Prop()
  value;

  @Prop()
  label: string;

  async onInput(e) {
    this.$emit("input", e.target.value);
    return;
  }
}
</script>

<style scoped>

</style>
