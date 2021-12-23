<template>
  <section class="flex items-center">
    <FunctionalCalendar ref="Calendar" v-model="valueModel" v-bind="{ ...$attrs, configs: calendarConfigs }" v-on="$listeners">
      <template #default="{ day }">
        <slot name="day" :day="day">
          {{ day.day }}
        </slot>
      </template>

      <template #dateRangeInputs="{ startDate, endDate }">
        <div @click="pickerClick">
          <slot name="dateRangeInputs" :startDate="startDate" :endDate="endDate">
            <div class="vfc-single-input-wrapper">
              <div v-if="!!formatDateRange" class="vfc-single-input">{{ formatDateRange }}</div>
              <div v-else class="vfc-single-input vfc-single-input__placeholder">{{ dateRangeInputPlaceholder }}</div>
              <img class="vfc-single-input__img" src="/images/calendar.svg" width="18" height="18" />
            </div>
          </slot>
        </div>
      </template>

      <template #datePickerInput="{ selectedDate }">
        <div @click="pickerClick">
          <slot name="datePickerInput" :selectedDate="selectedDate">
            <div readonly class="vfc-single-input">{{ selectedDate }}</div>
          </slot>
        </div>
      </template>

      <template #footer>
        <div class="flex flex-col w-full">
          <slot name="footer"></slot>
        </div>
      </template>
    </FunctionalCalendar>
    <svg
      v-if="value.dateRange.end || value.dateRange.start"
      class="ml-10 cursor-pointer"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @click.prevent="$emit('clear')"
    >
      <rect
        width="15.1591"
        height="1.51591"
        rx="0.757954"
        transform="matrix(0.701006 0.713155 -0.701006 0.713155 1.0625 0.108887)"
        fill="#131313"
      />
      <rect
        width="15.1591"
        height="1.51591"
        rx="0.757954"
        transform="matrix(0.701006 -0.713155 0.701006 0.713155 0.310547 10.8105)"
        fill="#131313"
      />
    </svg>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import dayjs from "dayjs";
import { BaseViewModel } from "@/_core/models/BaseViewModel";
const FunctionalCalendar = () => import("vue-functional-calendar/src/components/FunctionalCalendar.vue");

export class DaysRangeModel extends BaseViewModel {
  dateRange = {
    start: "",
    end: "",
  };
}

@Component({
  inheritAttrs: false,
  components: {
    FunctionalCalendar,
  },
})
export default class BaseCalendar extends Vue {
  inheritAttrs = false;

  public $refs!: {
    Calendar: any;
  };

  @Prop()
  config: any;

  @Prop()
  value: any;

  @Prop({ default: "Период" })
  dateRangeInputPlaceholder: string;

  created() {
    console.log(this.value);
  }

  get valueModel() {
    return this.value || {};
  }

  set valueModel(val) {
    this.$emit("input", val);
  }

  get defaultConfig() {
    return {
      isModal: true,
      disabledDates: ["beforeToday"],
      enabledDates: [],
      dateFormat: "yyyy-mm-dd",
      isAutoCloseable: true,
      isLayoutExpandable: true,
      alwaysUseDefaultClasses: true,
      transition: true,
      dayNames: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
      monthNames: [
        "ЯНВАРЬ",
        "ФЕВРАЛЬ",
        "МАРТ",
        "АПРЕЛЬ",
        "МАЙ",
        "ИЮНЬ",
        "ИЮЛЬ",
        "АВГУСТ",
        "СЕНТЯБРЬ",
        "ОКТЯБРЬ",
        "НОЯБРЬ",
        "ДЕКАБРЬ",
      ],
    };
  }

  get calendarConfigs() {
    return { ...this.defaultConfig, ...this.config };
  }

  get formatDateRange() {
    if (!!this.valueModel && !!this.valueModel.dateRange) {
      const result = `${
        !!this.valueModel?.dateRange?.start ? dayjs(this.valueModel?.dateRange?.start).format("DD.MM.YYYY") : ""
      } ${!!this.valueModel?.dateRange?.start && !!this.valueModel?.dateRange?.end ? "~" : ""} ${
        !!this.valueModel?.dateRange?.end ? dayjs(this.valueModel?.dateRange?.end).format("DD.MM.YYYY") : ""
      }`;
      return result.trim();
    }
    return null;
  }

  pickerClick() {
    this.$refs.Calendar.onFocusIn();
  }

  close() {
    this.$refs.Calendar.showCalendar = this.$refs.Calendar.showMonthPicker = this.$refs.Calendar.showYearPicker = false;
  }

  getCalendarDate(): Date {
    return this.$refs.Calendar.listCalendars[0].date;
  }

  getCalendarDateJsFormatted(): string {
    return dayjs(this.getCalendarDate()).format("YYYY-MM-DD")?.replace(/-0+/g, "-");
  }

  getCalendarDateFormatted(): string {
    return dayjs(this.getCalendarDate()).format("YYYY-MM-DD");
  }
}
</script>

//
<style lang="scss">
.vfc-calendar-day__selected {
  display: inline-block;
  text-align: center;
  width: 30px;
  line-height: 30px;
  border-radius: 50% !important;
  margin: 0 auto;
  background-color: #d4d8ea !important;
  color: black !important;
}

.vfc-main-container {
  font-family: $font-stack;
  color: $primary;
}

.vfc-single-input-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  .vfc-single-input {
    display: flex;
    align-items: center;
    width: max-content;
    min-width: 160px;
    border: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: $primary;
    position: relative;
    cursor: pointer;
    border-radius: 0px;
    padding: 0px;
  }
  .vfc-single-input__img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
}
.vfc-cursor-pointer {
  color: $primary;
}

.vfc-calendar {
  font-family: $font-stack;
  font-size: 13px;
  line-height: 24px !important;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .vfc-top-date {
    > span {
      font-size: 13px;
      line-height: 24px !important;
      font-weight: 600;
      color: $primary;
    }
  }

  .vfc-dayNames {
    .vfc-day {
      font-size: 11px;
      color: $gray;
    }
  }
}
.vfc-day {
  margin-right: 6px;
  span {
    display: inline-block;
    text-align: center;
    width: 30px;
    line-height: 30px;
    &.vfc-disabled {
      color: rgba(133, 133, 133, 0.6);
      cursor: not-allowed !important;
    }
    &:after {
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      content: attr(data-date);
      color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &.vfc-hover:hover,
    &.vfc-hovered {
      background-color: $gray;
      z-index: 100;
      cursor: pointer;
      border-radius: 50%;
    }
  }
}

.vfc-today {
  background-color: $primary !important;
  border-color: $primary !important;
  border-radius: 50% !important;
  color: white;
}

span.vfc-span-day.vfc-marked::before {
  background-color: transparent !important;
}

span.vfc-span-day.vfc-marked:not(.vfc-calendar-day__selected) {
  background-color: transparent !important;
}

.vfc-start-marked,
.vfc-end-marked,
.vfc-borderd {
  background-color: $secondary !important;
  border-radius: 50% !important;
  color: white;
}

span.vfc-span-day.vfc-marked.vfc-borderd::before {
  background-color: $secondary !important;
  border-radius: 50% !important;
  color: white;
}

.vfc-base-start,
.vfc-base-end {
  background-color: transparent !important;
}
span.vfc-span-day.vfc-start-marked::before {
  background-color: $secondary !important;
  border-radius: 50% !important;
  color: white;
}

span.vfc-span-day.vfc-end-marked::before {
  background-color: $secondary !important;
  border-radius: 50% !important;
  color: white;
}

.vfc-cursor-not-allowed {
  cursor: not-allowed !important;
}

.vfc-single-input__placeholder {
  font-size: 14px !important;
  color: $text-gray !important;
}
</style>
