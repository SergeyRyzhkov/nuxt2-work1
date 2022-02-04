<template>
  <transition name="skeleton" mode="out-in">
    <div class="article-smallitem">
      <div class="skeleton skeleton--wave article-smallitem__preview">
        <div class="article-smallitem__preview-img h-200 w-400"></div>
      </div>
      <div class="article-smallitem__header py-10">
        <div class="skeleton skeleton--wave h-20 w-full"></div>
      </div>
      <div class="article-smallitem__stat-info mt-6">
        <div class="article-smallitem__date">
          <div class="skeleton skeleton--wave h-13 w-130"></div>
        </div>
      </div>
    </div>
  </transition>
</template>
