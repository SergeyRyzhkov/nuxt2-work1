<template>
  <section>
    <label :for="id" class="radio">
      <input :id="id" type="radio" :name="name" class="hidden" :value="value" v-bind="$attrs" v-on="$listeners" />
      <span class="label"></span>{{ label }}
    </label>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
@Component
export default class BaseRadio extends Vue {
  @Prop()
  name: string;

  @Prop()
  id: number;

  @Prop()
  value;

  @Prop()
  label: string;
}
</script>

<style lang="scss">
.radio {
  position: relative;
  cursor: pointer;
  line-height: 20px;
  font-size: 14px;
  .label {
    position: relative;
    display: block;
    float: left;
    margin-right: 10px;
    width: 20px;
    height: 20px;
    border: 1px solid #c9c9c9;
    border-radius: 100%;
    -webkit-tap-highlight-color: transparent;
    &:after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      background: $secondary;
      transform: scale(0);
      transition: all 0.2s ease;
      opacity: 0.08;
      pointer-events: none;
    }
    &:hover {
      .label:after {
        transform: scale(3.6);
      }
    }
  }
}
input[type="radio"]:checked + .label {
  border-color: #c9c9c9;
  &:after {
    transform: scale(1);
    transition: all 0.2s cubic-bezier(0.35, 0.9, 0.4, 0.9);
    opacity: 1;
  }
}
</style>
