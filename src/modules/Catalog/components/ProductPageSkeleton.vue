<template>
  <transition-group name="skeleton" mode="out-in">
    <div :key="1" class="flex flex-col lg:flex-row lg:items-start w-full">
      <div :key="2" class="lg:w-7/12 w-full h-400 skeleton skeleton--wave"></div>
      <div :key="3" class="lg:w-5/12 ml-0 lg:ml-80">
        <div class="skeleton skeleton--wave h-24"></div>
        <div class="skeleton skeleton--wave h-14 mt-18"></div>
        <div class="skeleton skeleton--wave h-40 mt-22"></div>
        <div class="skeleton skeleton--wave h-110 mt-22"></div>
        <div class="skeleton skeleton--wave h-120 mt-22"></div>
      </div>
    </div>
    <div :key="4" class="skeleton skeleton--wave mt-20 md:mt-40 h-400"></div>
  </transition-group>
</template>
