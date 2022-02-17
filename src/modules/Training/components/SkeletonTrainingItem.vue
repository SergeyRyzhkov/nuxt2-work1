<template>
  <transition-group name="skeleton" mode="out-in">
    <div :key="1" class="skeleton skeleton--wave h-223" />
    <div :key="2" class="mt-16 flex items-center justify-between">
      <div class="skeleton skeleton--wave h-14 w-220"></div>
      <div class="skeleton skeleton--wave h-16 w-80"></div>
    </div>
    <div :key="3" class="skeleton skeleton--wave mt-12 h-22"></div>
    <div :key="4" class="skeleton skeleton--wave mt-12 h-14 w-100"></div>
  </transition-group>
</template>
