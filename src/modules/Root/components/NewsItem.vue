<template>
  <article v-if="!!articleModel && !!articleModel.meta_slug" class="article-smallitem" @click="goToCard()">
    <figure class="article-smallitem__preview">
      <img :src="imageSrc" :alt="articleModel.title" itemprop="image" class="article-smallitem__preview-img" loading="lazy" />
      <figcaption>{{ articleModel.title }}</figcaption>
    </figure>
    <header class="article-smallitem__header">
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
      <div v-if="articleModel.views_count > 0" class="article-smallitem__views">
        <img src="/images/eye.svg" alt="Количество просмотров" title="Количество просмотров" />
        <span>{{ 10 }}</span>
      </div>
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
  border: 1px solid $light-gray;
  margin: 15px;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.12);
  }
}
.article-smallitem__preview-img {
  max-width: 100%;
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  object-position: center;
}
figcaption {
  display: none;
}
.article-smallitem__header {
  flex-grow: 1;
  padding: 10px;
}

.article-smallitem__stat-info {
  color: $gray;
  display: flex;
  flex-direction: row;
  border-top: 1px solid $light-gray;
  font-size: 13px;
  padding: 10px;

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
