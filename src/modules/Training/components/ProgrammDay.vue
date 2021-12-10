<template>
  <div class="programm-day">
    <div class="programm-day__title" @click="toogle()">
      <span>{{ dayNumber + " день. " + day.name }}</span>
      <span v-if="!isContentActive" class="text-28 font-normal">+</span>
      <span v-if="isContentActive" class="text-28 font-normal">-</span>
    </div>
    <div class="programm-day__content" :class="[isContentActive ? 'active' : '']">{{ day.content }}</div>
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
  .programm-day__content {
    font-size: 14px;
    margin-top: 0px;
    visibility: hidden;
    opacity: 0;
    height: 0;
    transition: height 1s ease, opacity 1s ease;
    &.active {
      margin-top: 16px;
      visibility: visible;
      opacity: 1;
      height: auto;
    }
  }

  .programm-day__title {
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
