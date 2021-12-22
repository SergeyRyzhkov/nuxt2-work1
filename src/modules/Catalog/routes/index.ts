const routes = [
  {
    name: "catalog",
    path: "/catalog/(.*)*",
    component: () => lazyLoad(import("@/modules/Catalog/pages/CategoryPage.vue")),
    props: { slug: "" },
  },

  {
    name: "product",
    path: "/products/:slug",
    component: () => lazyLoad(import("@/modules/Catalog/pages/ProductPage.vue")),
    props: true,
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
