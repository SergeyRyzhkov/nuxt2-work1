<template>
  <article v-if="!!articleModel && !!articleModel.meta_slug" class="article-smallitem" @click="goToCard()">
    <figure class="article-smallitem__preview">
      <img v-lazysrc="imageSrc" alt=" " itemprop="image" class="article-smallitem__preview-img" width="400" height="280" />
      <figcaption>{{ articleModel.title }}</figcaption>
    </figure>
    <header class="article-smallitem__header leading-20">
      {{ articleModel.title }}
    </header>
    <div class="article-smallitem__stat-info">
      <div class="article-smallitem__date">
        <span itemprop="datePublished" :content="dateFormatted">{{ dateFormatted }}</span>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import NewsModel from "../models/NewsModel";

@Component
export default class NewsItem extends Vue {
  @Prop()
  articleModel: NewsModel;

  get imageSrc() {
    return this.articleModel?.logo?.url || null;
  }

  goToCard() {
    // @ts-ignore
    this.$router.push({ name: "news-card", params: { slug: `${this.articleModel.meta_slug}-${this.articleModel.id}` } });
  }

  get dateFormatted() {
    return this.$dayjs(this.articleModel.published_at).format("DD MMMM YYYY");
  }
}
</script>

<style lang="scss">
.article-smallitem {
  // margin: 0px 15px 39px 15px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.article-smallitem__preview-img {
  max-width: 100%;
  width: 100%;
  height: 280px;
  object-fit: cover;
  object-position: center top;
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
