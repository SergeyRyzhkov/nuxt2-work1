<template>
  <section class="w-full">
    <h3 class="hidden lg:block">Заказы</h3>

    <div class="mb-38 mt-32 flex items-center lg:hidden">
      <img class="cursor-pointer" src="/icons/left-arrow.svg" width="24" height="24" @click="$router.push({ name: 'profile' })" />
      <h3 class="mx-auto">Заказы</h3>
    </div>

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
    <OrderItem
      v-for="(iter, index) in orderList"
      :key="index"
      :model="iter"
      class="mt-25 flex flex-col"
      @cancel-order="cancelOrder"
      @repeat-order="repeatOrder"
    />
  </section>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { ProfileService } from "../ProfileService";
import ExecutionOrderModel from "../models/ExecutionOrderModel";
import { DaysRangeModel } from "@/components/forms/BaseCalendar.vue";

@Component
export default class ProfileOrderList extends Vue {
  tabActive = 1;
  daysRange: DaysRangeModel = new DaysRangeModel();
  orderList: ExecutionOrderModel[] = [];

  async fetch() {
    await this.updateData();
  }

  @Watch("tabActive", { immediate: true })
  onTabChanged() {
    this.updateData();
  }

  async updateData() {
    const statusList: string[] = [];
    if (this.tabActive === 1) {
      statusList.push("created");
      statusList.push("processing");
      statusList.push("confirmed");
      statusList.push("in_work");
      statusList.push("handing");
      statusList.push("on_the_way");
    }

    if (this.tabActive === 2) {
      statusList.push("completed");
    }

    if (this.tabActive === 3) {
      statusList.push("canceled");
    }

    this.orderList = await this.$serviceLocator
      .getService(ProfileService)
      .getOrderList(this.daysRange.dateRange.start, this.daysRange.dateRange.end, statusList);
  }

  async cancelOrder(order: ExecutionOrderModel) {
    const message = await this.$serviceLocator.getService(ProfileService).cancelOrder(order);
    if (!message) {
      this.updateData();
    } else {
      this.$modalManager.showError(message);
    }
  }

  async repeatOrder(order: ExecutionOrderModel) {
    const message = await this.$serviceLocator.getService(ProfileService).repeatOrder(order);
    if (!message) {
      this.updateData();
    } else {
      this.$modalManager.showError(message);
    }
  }

  @Watch("daysRange", { deep: true })
  onDaysRangeChanged() {
    if (!!this.daysRange.dateRange.end) {
      this.updateData();
    }
  }

  clearDate() {
    this.daysRange = new DaysRangeModel();
    this.updateData();
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
