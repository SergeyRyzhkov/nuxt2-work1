<template>
  <transition name="skeleton" mode="out-in">
    <div>
      <div class="h-160 skeleton skeleton--wave" />
      <div class="flex items-center justify-between mt-16">
        <div class="skeleton skeleton--wave h-14 w-220"></div>
        <div class="h-16 skeleton skeleton--wave w-80"></div>
      </div>
      <div class="mt-12 h-22 skeleton skeleton--wave"></div>
      <div class="mt-12 h-14 skeleton skeleton--wave w-100"></div>
    </div>
  </transition>
</template>
