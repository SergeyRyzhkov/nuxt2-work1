<template>
  <div class="programm-day">
    <div class="flex font-semibold text-18 justify-between items-center cursor-pointer" @click="toogle()">
      <span>{{ dayNumber + " день. " + day.name }}</span>
      <span v-if="!isContentActive" class="text-28 font-normal">+</span>
      <span v-if="isContentActive" class="text-28 font-normal">-</span>
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
    line-height: 0px;
  }
  &__content {
    max-height: 0px;
    overflow-y: hidden;
    font-size: 14px;
    transition: 0.2s;
    margin-top: 0px;
    &.active {
      max-height: 300px;
      margin-top: 16px;
    }
  }
}
</style>
