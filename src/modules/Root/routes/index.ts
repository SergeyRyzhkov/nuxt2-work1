const routes = [
  {
    name: "main",
    path: "/",
    component: () => lazyLoad(import("@/modules/Root/pages/MainPage.vue")),
  },
  {
    name: "news",
    path: "/news",
    component: () => lazyLoad(import("@/modules/Root/pages/NewsPage.vue")),
  },
  {
    name: "about",
    path: "/about",
    component: () => lazyLoad(import("@/modules/Root/pages/AboutPage.vue")),
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
