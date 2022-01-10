<template>
  <main>
    <div class="arenda-page container-fluid flex items-end h-400 relative">
      <div class="container relative w-full md:w-8/12 xl:w-1/2 mb-32 md:mb-55">
        <h1>Аренда студии</h1>
      </div>
    </div>
    <div class="container page-wrapper mt-32 md:mt-55 w-full md:w-8/12 xl:w-1/2 ml-auto mr-auto">
      <p class="text-24 font-semibold">
        Итальянское совершенство, передовые технологии и инновации в beauty-индустрии и исключительно натуральные компоненты
        позволяют нам создавать идеальные продукты для красоты ваших волос!
      </p>
      <section class="text-14 mt-28">
        <p>
          В современном мире мы всё чаще задумываемся о защите окружающей среды. Это не только забота об экологии, но и
          собственная безопасность.
        </p>

        <p class="mt-28">Все больше людей выбирают средства ухода, содержащие компоненты растительного происхождения.</p>

        <p class="mt-28">Бренд KAYPRO представляет серию средств натуральной косметики Natural Kay.</p>
        Производство и утилизация этой продукции не вредит окружающей среде, и дарит вам максимальный эффект при использовании.

        <p class="mt-28">
          Натуральные масла и экстракты растений насыщают волосы необходимыми витаминами и микроэлементами. Они становятся
          эластичными, увлажненными и дольше сохраняют цвет.
        </p>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";

@Component
export default class ArendaPage extends Vue {
  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }
}
</script>

<style lang="scss">
.arenda-page {
  background: linear-gradient(268.69deg, #baccff -0.81%, #f2e1dc 60.12%), #eaeaea;
}
</style>
