<template>
  <section>
    <div class="favorite-item">
      <figure class="md:px-30 md:py-32 py-18 px-16 w-full">
        <img src="/images/FavoriteTestImage.png" alt="" itemprop="image" class="w-full" loading="lazy"/>
        <figcaption></figcaption>
      </figure>
      <div class="flex flex-col items-center px-11">
        <div class="favorite-item-type mt-12">Новое</div>
        <div class="favorite-item-title mt-12">Шампунь KAYPRO Caviar Supreme для окрашенных волос</div>
        <div class="favorite-item-price mt-12">2 000 ₽</div>
        <div class="mt-20">
          <BaseButton>В корзину</BaseButton>
        </div>
      </div>
      <div class="favorite-item-icon cursor-pointer">
        <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M11.5 4.39474C11.5 4.39471 10.2107 1.5 7 1.5C4.13647 1.5 1.5 3.79553 1.5 7.65789C1.5 11.3405 4.90863 13.9376 6.76506 15.7064C8.62149 17.4752 11.5 19.5 11.5 19.5C11.5 19.5 14.3785 17.4752 16.2349 15.7064C18.0914 13.9376 21.5 11.3405 21.5 7.65789C21.5 3.79553 18.8635 1.5 16 1.5C12.7893 1.5 11.5 4.39471 11.5 4.39474Z"
                fill="#FF1220" stroke="#FF1220" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FavoriteItem"
}
</script>

<style lang="scss">
.favorite-item {
  @apply flex flex-col items-center relative;

  &-type {
    color: #4BC967;
    @apply uppercase font-bold;
    font-size: 12px;
    line-height: 14px;
    @include mobile {
      font-size: 14px;
      line-height: 17px;
    }
  }

  &-title {
    line-height: 17px;
    font-size: 14px;
    text-align: center;
    @include mobile {
      line-height: 20px;
      font-size: 16px;
    }
  }

  &-price {
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    @include mobile {
      font-size: 18px;
      line-height: 22px;
    }
  }

  &-icon {
    position: absolute;
    top: 12px;
    right: 12px;
  }

}
</style>
