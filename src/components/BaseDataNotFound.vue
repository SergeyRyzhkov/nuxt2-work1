<template>
  <div class="not-found">
    <img :src="iconPath" width="36" height="36" />
    <div class="not-found__title">{{ title }}</div>
    <div class="not-found__text">{{ text }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BaseDataNotFound extends Vue {
  @Prop({ default: "/icons/bad_smile.svg" })
  iconPath: string;

  @Prop({ default: "ОЙ! Вы ничего не выбрали" })
  title: string;

  @Prop({ default: "Попробуйте сбросить фильтры или изменить запрос" })
  text: string;
}
</script>

<style lang="scss">
.not-found {
  margin-top: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__title,
  &__text {
    margin-top: 10px;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #16192c;
  }
  &__text {
    margin-top: 0;
    color: #9495a6;
  }
}
</style>
