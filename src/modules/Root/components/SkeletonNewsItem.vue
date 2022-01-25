<template>
  <transition name="skeleton" mode="out-in">
    <div class="article-smallitem">
      <div class="skeleton skeleton--wave article-smallitem__preview">
        <div class="article-smallitem__preview-img w-400 h-200"></div>
      </div>
      <div class="article-smallitem__header">
        <div class="skeleton skeleton--wave w-full h-32"></div>
      </div>
      <div class="article-smallitem__stat-info">
        <div class="article-smallitem__date">
          <div class="skeleton skeleton--wave w-full h-13"></div>
        </div>
      </div>
    </div>
  </transition>
</template>
