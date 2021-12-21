const routes = [
  {
    name: "profile",
    path: "/profile",
    component: () => lazyLoad(import("@/modules/Profile/pages/Index.vue")),
    children: [
      {
        name: "orders",
        path: "orders",
        component: () => lazyLoad(import("@/modules/Profile/pages/Orders.vue")),
      }
    ]
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
