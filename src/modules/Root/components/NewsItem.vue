<template>
  <article v-if="!!articleModel && !!articleModel.meta_slug" class="article-smallitem" @click="goToCard()">
    <figure class="article-smallitem__preview">
      <img :src="imageSrc" :alt="articleModel.title" itemprop="image" class="article-smallitem__preview-img" loading="lazy" />
      <figcaption>{{ articleModel.title }}</figcaption>
    </figure>
    <header class="article-smallitem__header leading-20">
      {{ articleModel.title }}
    </header>
    <div class="article-smallitem__stat-info">
      <div class="article-smallitem__date">
        <span
          itemprop="datePublished"
          :content="articleModel.published_at ? new Date(articleModel.published_at).toISOString().split('T')[0] : ''"
          >{{ articleModel.published_at ? new Date(articleModel.published_at).toLocaleDateString("ru-RU") : "" }}</span
        >
      </div>
<!--      <div v-if="articleModel.views_count > 0" class="article-smallitem__views">-->
<!--        <img src="/images/eye.svg" alt="Количество просмотров" title="Количество просмотров" />-->
<!--      </div>-->
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import NewsModel from "../models/NewsModel";

@Component({})
export default class NewsItem extends Vue {
  @Prop()
  articleModel: NewsModel;

  get imageSrc() {
    return this.articleModel?.logo?.url || null;
  }

  goToCard() {
    // @ts-ignore
    this.$router.push({ name: "news-card", params: { slug: this.articleModel.meta_slug } });
  }
}
</script>

<style lang="scss">
.article-smallitem {
  margin: 0px 15px 39px 15px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.article-smallitem__preview-img {
  max-width: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
figcaption {
  display: none;
}
.article-smallitem__header {
  flex-grow: 1;
  @apply py-10;
}

.article-smallitem__stat-info {
  color: $gray;
  display: flex;
  flex-direction: row;
  font-size: 13px;
  @apply pt-2;
  .article-smallitem__views {
    text-align: right;
    width: 50%;
    img {
      display: inline !important;
    }
  }
  .article-smallitem__date {
    float: left;
    width: 50%;
  }
}
</style>
