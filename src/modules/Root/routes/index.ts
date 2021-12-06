import { lazyLoad } from "@/utils/Common";

const routes = [
  {
    name: "main",
    path: "/",
    component: () => lazyLoad(import("@/modules/Root/pages/MainPage.vue")),
  },
];

export default routes;
