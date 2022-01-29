<template>
  <transition name="skeleton" mode="out-in">
    <div class="article-smallitem">
      <div class="skeleton skeleton--wave article-smallitem__preview">
        <div class="article-smallitem__preview-img h-200 w-400"></div>
      </div>
      <div class="article-smallitem__header">
        <div class="skeleton skeleton--wave h-32 w-full"></div>
      </div>
      <div class="article-smallitem__stat-info">
        <div class="article-smallitem__date">
          <div class="skeleton skeleton--wave h-13 w-full"></div>
        </div>
      </div>
    </div>
  </transition>
</template>
