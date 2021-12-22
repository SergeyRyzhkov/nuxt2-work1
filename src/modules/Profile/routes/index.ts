const routes = [
  {
    name: "profile",
    path: "/profile",
    component: () => lazyLoad(import("@/modules/Profile/pages/ProfilePage.vue")),
    children: [
      {
        name: "personal",
        path: "/profile",
        component: () => lazyLoad(import("@/modules/Profile/components/PersonalData.vue")),
      },
      {
        name: "orders",
        path: "orders",
        component: () => lazyLoad(import("@/modules/Profile/components/ProfileOrders.vue")),
      },
    ],
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
