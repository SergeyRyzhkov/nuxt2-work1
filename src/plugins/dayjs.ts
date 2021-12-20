import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/ru";
import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";

dayjs.locale("ru");
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(isSameOrBefore);

declare module "vue/types/vue" {
  interface Vue {
    $date: typeof dayjs;
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $date: typeof dayjs;
  }

  interface Context {
    $date: typeof dayjs;
  }
}

// export { dayjs as date };

export default (_ctx: Context, inject: Inject) => {
  inject("date", dayjs);
};
