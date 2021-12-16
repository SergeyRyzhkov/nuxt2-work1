const routes = [
  {
    name: "main",
    path: "/",
    component: () => lazyLoad(import("@/modules/Root/pages/MainPage.vue")),
  },
  {
    name: "news",
    path: "/news",
    component: () => lazyLoad(import("@/modules/Root/pages/NewsListPage.vue")),
  },
  {
    name: "news-card",
    path: "/news/:slug",
    props: true,
    component: () => lazyLoad(import("@/modules/Root/pages/NewsPage.vue")),
  },
  {
    name: "about",
    path: "/about",
    component: () => lazyLoad(import("@/modules/Root/pages/AboutPage.vue")),
  },
  {
    name: "cooperation",
    path: "/cooperation",
    component: () => lazyLoad(import("@/modules/Root/pages/CooperationPage.vue")),
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
