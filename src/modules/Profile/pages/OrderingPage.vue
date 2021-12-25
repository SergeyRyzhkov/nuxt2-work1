<template>
  <main class="page-wrapper linear-order">
    <div class="container flex">
      <section class="w-1/2 pt-60 line-half">
        <h1>Оформление заказа</h1>
        <BreadCrumbs />
        <OrderForm />
      </section>
      <section class="w-1/2 pt-60">
        <Cart :is-ordering="true" />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import AppStore from "@/modules/Root/store/AppStore";

@Component
export default class OrderingPage extends Vue {
  fetch() {
    this.updateBreadCrumbs();
  }

  updateBreadCrumbs() {
    const breadCrumbList = [
      { linkName: "Главная", name: "main" },
      { linkName: "Корзина", name: "main" },
      { linkName: "Оформление заказа" },
    ];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }
}
</script>

<style lang="scss">
.line-half {
  border-right: 0.5px solid #c9c9c9;
}

.linear-order {
  background: linear-gradient(90deg, rgba(255, 255, 255, 1) 50%, rgba(248, 248, 248, 1) 50%);
}
</style>
