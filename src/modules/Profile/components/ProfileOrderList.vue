<template>
  <section class="w-full">
    <h3>Заказы</h3>
    <div class="mt-40 flex flex-col items-center justify-between md:flex-row">
      <div>
        <button type="button" class="order-tab-page" :class="{ active: tabActive === 1 }" @click="tabActive = 1">Текущие</button>
        <button type="button" class="order-tab-page" :class="{ active: tabActive === 2 }" @click="tabActive = 2">
          Выполненные
        </button>
        <button type="button" class="order-tab-page" :class="{ active: tabActive === 3 }" @click="tabActive = 3">
          Отмененные
        </button>
      </div>
      <LazyBaseCalendar
        v-model="daysRange"
        :config="{
          isMultiple: true,
          calendarsCount: 1,
          isDateRange: true,
          isDatePicker: false,
          placeholder: 'Выберите дату',
        }"
        @clear="clearDate"
      />
    </div>
    <OrderItem v-for="i in 10" :key="i" class="mt-25 flex flex-col" />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { ProfileService } from "../ProfileService";
import { DaysRangeModel } from "@/components/forms/BaseCalendar.vue";

@Component
export default class ProfileOrderList extends Vue {
  tabActive = 1;
  daysRange: DaysRangeModel = new DaysRangeModel();

  async fetch() {
    const orders = await this.$serviceLocator.getService(ProfileService).getOrderList();
    console.log(orders);
  }

  clearDate() {
    this.daysRange = new DaysRangeModel();
  }
}
</script>
<style lang="scss">
.order-tab-page {
  font-size: 14px;
  font-weight: 500;
  color: $primary;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: $secondary;
  }
  &.active {
    color: $secondary;
  }
  + .order-tab-page {
    margin-left: 28px;
  }
}
</style>
