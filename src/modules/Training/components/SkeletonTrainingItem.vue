<template>
  <transition-group name="skeleton" mode="out-in">
    <div :key="1" class="h-160 skeleton skeleton--wave" />
    <div :key="2" class="flex items-center justify-between mt-16">
      <div class="skeleton skeleton--wave h-14 w-220"></div>
      <div class="h-16 skeleton skeleton--wave w-80"></div>
    </div>
    <div :key="3" class="mt-12 h-22 skeleton skeleton--wave"></div>
    <div :key="4" class="mt-12 h-14 skeleton skeleton--wave w-100"></div>
  </transition-group>
</template>
