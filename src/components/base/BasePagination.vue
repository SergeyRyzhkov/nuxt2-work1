<template>
  <div v-if="countPage > 1" class="brc-pagination">
    <ul>
      <li v-if="pages[0] > 1" @click="currentChange(pages[0] - 1)">&lt;</li>
      <li v-for="page in pages" :key="page" :class="{ active: isActivePage(page) }" @click="() => currentChange(page)">
        {{ page }}
      </li>
      <li v-if="pages[pages.length - 1] < countPage" @click="() => currentChange(pages[pages.length - 1] + 1)">&gt;</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BasePagination extends Vue {
  @Prop(Number)
  limit;

  @Prop(Number)
  total;

  @Prop(Number)
  currentPage;

  @Prop({ default: true })
  onUpdateScroolToTop;

  @Prop()
  selectedPages: number[];

  isActivePage(pageNmb: number) {
    return pageNmb === this.currentPage || this.selectedPages?.includes(pageNmb);
  }

  get countPage() {
    return this.limit > 0 ? Math.ceil(this.total / this.limit) : 0;
  }

  get pages() {
    const pages: number[] = [];

    let startPage = 1;
    let endPage = this.countPage;

    if (this.currentPage - Math.floor(this.limit / 2) <= 1) {
      endPage = this.limit < this.countPage ? this.limit : this.countPage;
    } else if (this.currentPage + Math.floor(this.limit / 2) > this.countPage) {
      startPage = this.countPage - this.limit > 1 ? this.countPage - this.limit : 1;
    } else {
      startPage = this.currentPage - Math.floor(this.limit / 2);
      endPage = startPage + this.limit - 1;
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  currentChange(current: number) {
    this.$emit("update:currentPage", current);
    this.fireUpdateEvent();
  }

  fireUpdateEvent() {
    this.$emit("update:pagination");
    if (this.onUpdateScroolToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}
</script>

<style lang="scss">
.brc-pagination {
  display: block;
  width: 100%;

  ul {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    > li {
      padding: 10px;
      margin: 8px;
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      font-size: 17px;
      font-weight: 600;
      cursor: pointer;

      // &:hover {
      //   color: $red;
      //   cursor: pointer;
      //   border: 1px solid gray;
      // }

      &.active {
        background-color: #efefef;
        border: 1px solid #efefef;
        color: #0919a8;
      }
    }
  }
}
</style>
