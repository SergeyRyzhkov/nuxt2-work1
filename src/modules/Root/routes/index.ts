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
  {
    name: "faq",
    path: "/faq",
    component: () => lazyLoad(import("@/modules/Root/pages/FaqPage.vue")),
  },
  {
    name: "contacts",
    path: "/contacts",
    component: () => lazyLoad(import("@/modules/Root/pages/ContactsPage.vue")),
  },
  {
    name: "documents",
    path: "/documents",
    props: { isFaq: false },
    component: () => lazyLoad(import("@/modules/Root/pages/FaqPage.vue")),
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
