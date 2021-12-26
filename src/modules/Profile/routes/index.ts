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
  {
    name: "favorites",
    path: "/profile/favorites",
    component: () => lazyLoad(import("@/modules/Profile/pages/FavoritesPage.vue")),
  },
  {
    name: "ordering",
    path: "/ordering",
    component: () => lazyLoad(import("@/modules/Profile/pages/OrderingPage.vue")),
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
