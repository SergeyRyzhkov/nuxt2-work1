const routes = [
  {
    name: "catalog",
    path: "/catalog",
    component: () => lazyLoad(import("@/modules/Catalog/pages/CatalogPage.vue")),
    props: { slug: null },
    children: [
      {
        name: "catalog-any",
        path: "*",
        props: true,
        component: () => lazyLoad(import("@/modules/Catalog/components/CategoryContent.vue")),
      },
      {
        name: "catalog-root",
        path: "/catalog",
        props: true,
        component: () => lazyLoad(import("@/modules/Catalog/components/CategoryContent.vue")),
      },
    ],
  },

  {
    name: "product",
    path: "/products/:id",
    component: () => lazyLoad(import("@/modules/Catalog/pages/ProductPage.vue")),
    props: true,
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
