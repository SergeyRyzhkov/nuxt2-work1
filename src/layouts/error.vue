<template>
  <div class="w-full flex items-center justify-center">
    <div class="flex items-center justify-center max-w-[375px] mt-76 md:mt-177 mb-166 md:mb-230">
      <div class="flex flex-col text-center">
        <h1 class="text-124">{{ error.status }}</h1>
        <h1 class="text-48 mt-24">{{ error.title }}</h1>
        <div class="mt-16 text-14">{{ error.description }}</div>
        <div class="mt-27">
          <nuxt-link :to="{ name: 'main' }" class="link-hover text-14 inline-block"> Вернуться назад </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
@Component
export default class error extends Vue {
  error = {
    status: 404,
    title: "Страница не найдена",
    description: "Запрашиваемая вами страница не найдена, либо произошла ошибка.",
  };

  layout: "error";
}
</script>

<style lang="scss">
.link-hover {
  transition: 0.25s;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
}
</style>
