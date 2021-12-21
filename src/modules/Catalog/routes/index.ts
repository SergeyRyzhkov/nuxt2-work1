const routes = [
  {
    name: "catalog",
    path: "/catalog/(.*)*",
    component: () => lazyLoad(import("@/modules/Catalog/pages/CategoryPage.vue")),
    props: { slug: "" },
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
