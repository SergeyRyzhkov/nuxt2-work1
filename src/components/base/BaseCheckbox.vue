<template>
  <div class="flex items-center relative">
    <input type="checkbox" :id="id">
    <label class="text-14 leading-20 ml-12 cursor-pointer checkbox-label" :for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "nuxt-property-decorator";

@Component
export default class BaseCheckbox extends Vue {
  @Prop({required: true})
  label: string;
  @Prop({required: true})
  id: string;
}
</script>

<style lang="scss" scoped>
input[type=checkbox] {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid hsl(0, 0%, 85%);
  border-radius: 1px;
  vertical-align: sub;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  outline: none;

  &:checked {
    background-color: #000000;
    border-color: #000000;

    &:focus,
    &:hover {
    }
  }

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNS41TDMuNDI4NjMgOEw4LjUgMSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjQiLz4KPC9zdmc+Cg==");
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: center;
  }
}

.checkbox-label {
  padding: 0 18px;
  user-select: none;
  cursor: pointer;
}

</style>
