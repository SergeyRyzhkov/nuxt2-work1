<template>
  <multiselect
    :classes="classes"
    v-bind="{ ...$attrs, ...defaultOptions }"
    :options="selectOptions"
    v-on="{
      ...$listeners,
    }"
  >
  </multiselect>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
const multiselect = () => import("vue-multiselect/src/Multiselect.vue");

@Component({ components: { multiselect }, inheritAttrs: false })
export default class BaseMultiSelect extends Vue {
  inheritAttrs: false;

  @Prop()
  classes;

  @Prop()
  options: [];

  defaultOptions = {
    options: [{ id: 1000, name: "Другое" }],
    "preserve-search": true,
    autocomplete: true,
    searchable: false,
    "close-on-select": true,
    "show-labels": false,
    "internal-search": false,
    "clear-on-select": false,
    "track-by": "id",
    label: "name",
  };

  get selectOptions() {
    return [...this.options, ...this.defaultOptions.options];
  }
}
</script>

<style lang="scss" scoped>
::v-deep .multiselect {
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  // color: #16192c;

  .multiselect__content-wrapper {
    z-index: 1002;
  }

  .multiselect__input {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #16192c;
  }

  .multiselect__select {
    min-height: 48px;
    height: 48px;
    line-height: 14px;
  }
  ::v-deep .multiselect__tags {
    color: $primary;
    border: 1px solid #dddde4;
    border-radius: 4px;
    min-height: 48px;
    .multiselect__single {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: #16192c;
      padding: 0px;
      margin: 0px;
      padding-left: 8px;
      vertical-align: middle;
    }
  }
  .multiselect__option--highlight {
    background: #eef0fb;
    outline: none;
    color: $primary;
  }

  .multiselect__option--disabled {
    background: #ededed80 !important;
    cursor: text;
    pointer-events: none;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: inherit !important;
  }
}
</style>
