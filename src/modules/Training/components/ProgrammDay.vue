<template>
  <div class="programm-day">
    <div class="flex font-semibold text-18 justify-between items-center cursor-pointer" @click="toogle()">
      <span>{{ dayNumber + " день. " + day.name }}</span>
      <span v-show="!isContentActive" class="text-28 font-normal">+</span>
      <span v-show="isContentActive" class="text-28 font-normal">-</span>
    </div>
    <div class="programm-day__content" :class="[isContentActive ? 'active' : '']" v-html="day.content"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class ProgrammDay extends Vue {
  @Prop()
  day: { name: string; content: string };

  @Prop({ default: 1 })
  dayNumber;

  isContentActive = false;

  toogle() {
    this.isContentActive = !this.isContentActive;
  }
}
</script>

<style lang="scss">
.programm-day {
  border-bottom: 1px solid #c9c9c9;
  padding: 18px 0px 18px 0px;
  > span {
    transition: 0.2s;
    line-height: 0px;
    outline: none;
  }
  &__content {
    transition: 0.2s;
    max-height: 0px;
    overflow-y: hidden;
    font-size: 14px;
    margin-top: 0px;
    &.active {
      max-height: 300px;
      margin-top: 16px;
    }
  }
}
</style>
