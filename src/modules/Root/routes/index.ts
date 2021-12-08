const routes = [
  {
    name: "main",
    path: "/",
    component: () => lazyLoad(import("@/modules/Root/pages/MainPage.vue")),
  },
  {
    name: "news",
    path: "/novosti",
    component: () => lazyLoad(import("@/modules/Root/pages/NewsPage.vue")),
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
