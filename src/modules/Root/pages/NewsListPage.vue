<template>
  <main class="page-wrapper container">
    <BreadCrumbs />
    <h1>Новости</h1>

    <section class="news-list-wrapper mt-40">
      <NewsItem v-for="iter in newsList" :key="iter.id" :article-model="iter"> </NewsItem>
    </section>

    <!-- При вхождении в область видимости "сработает" коллбек от IntersectionObserver
         и компонент "выкинет" событие on-intersect (наш обработчик loadDataChunk())  -->
    <InfiniteScroll class="news-list-wrapper mt-0" @on-intersect="loadDataChunk()">
      <!-- На ммоент подгрузки данных (loading:boolean) отобразим скелетон -->
      <template v-if="loading">
        <SkeletonNewsItem v-for="index in 6" :key="index"> </SkeletonNewsItem>
      </template>
    </InfiniteScroll>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import NewsModel from "../models/NewsModel";
import AppStore from "../store/AppStore";
import { Pagination } from "@/_core/models/Pagination";
import { EmptyService } from "@/_core/service/EmptyService";

@Component
export default class NewsListPage extends Vue {
  // Массив новостей (моделей NewsModel)
  newsList: NewsModel[] = [];
  // Признак выполнения загрузки данных. Влияет на отображение индикатора (SkeletonNewsItem)
  loading = true;
  // Класс-модель "пагинации" и вспомогательные методы-вычисления
  pagination: Pagination = new Pagination();

  // "Первый" раз подгрузим данные
  async fetch() {
    this.updateBreadCrumbs();
    await this.loadDataChunk();
  }

  // Подгрузка данных
  async loadDataChunk() {
    // Проверям есть ли еще данные (см.класс Pagination)
    if (Pagination.hasNextPage(this.pagination)) {
      // "Включаем" отображение скелетона на время выполнения запроса к беку
      this.loading = true;
      // Через helper-класс увеличиваем страницу (для пагинации на беке)
      Pagination.nextPage(this.pagination);
      // Выполняем запрос к беку за "новой" порцией данных (через пагинацию)
      const result = await this.$serviceLocator
        .getService(EmptyService)
        .getArrayOrEmptyWithPagination(NewsModel, "users/news", {}, this.pagination);
      // Обновим общее количество элементов (важно если первый раз выполниил запрос к беку)
      this.pagination.total = result.pagination.total;
      // Расширим список Новостей (что было + новая "порция" данных)
      this.newsList = [...this.newsList, ...result.data];
      // "Выключаем+" отображение скелетона
      this.loading = false;
    }
  }

  updateBreadCrumbs() {
    const breadCrumbList = [{ linkName: "Главная", name: "main" }, { linkName: "Новости" }];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }
}
</script>
<style lang="scss">
.news-list-wrapper {
  @apply gap-y-30 gap-x-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
}
</style>
