<template>
  <section class="w-full">
    <h3>Личные данные</h3>
    <div class="mt-40 flex flex-col md:flex-row items-center justify-between">
      <div>
        <button type="button" class="order-tab-page" :class="{ active: tabActive === 1 }" @click="tabActive = 1">Текущие</button>
        <button type="button" class="order-tab-page" :class="{ active: tabActive === 2 }" @click="tabActive = 2">
          Выполненные
        </button>
        <button type="button" class="order-tab-page" :class="{ active: tabActive === 3 }" @click="tabActive = 3">
          Отмененные
        </button>
      </div>
      <base-calendar
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
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { DaysRangeModel } from "@/components/forms/BaseCalendar.vue";

@Component
export default class ProfileOrderList extends Vue {
  tabActive = 1;
  daysRange: DaysRangeModel = new DaysRangeModel();

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
