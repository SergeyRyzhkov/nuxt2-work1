<template>
  <transition-group name="skeleton" mode="out-in">
    <div :key="1" class="flex w-full flex-col lg:flex-row lg:items-start">
      <div :key="2" class="skeleton skeleton--wave h-400 w-full lg:w-7/12"></div>
      <div :key="3" class="ml-0 lg:ml-80 lg:w-5/12">
        <div class="skeleton skeleton--wave h-24"></div>
        <div class="skeleton skeleton--wave mt-18 h-14"></div>
        <div class="skeleton skeleton--wave mt-22 h-40"></div>
        <div class="skeleton skeleton--wave mt-22 h-110"></div>
        <div class="skeleton skeleton--wave mt-22 h-120"></div>
      </div>
    </div>
    <div :key="4" class="skeleton skeleton--wave mt-20 h-400 md:mt-40"></div>
  </transition-group>
</template>
