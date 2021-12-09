<template>
  <div class="flex items-center">
    <input type="checkbox" :id="id">
    <label class="text-14 leading-20 ml-12 cursor-pointer" :for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "nuxt-property-decorator";

@Component
export default class BaseCheckbox extends Vue{
@Prop({required: true})
  label:string;
@Prop({required: true})
  id:string;
}
</script>

<style scoped>

</style>
