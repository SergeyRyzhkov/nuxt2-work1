const routes = [
  {
    name: "training",
    path: "/training",
    component: () => lazyLoad(import("@/modules/Training/pages/TrainingListPage.vue")),
  },

  {
    name: "training-arenda-card",
    path: "/training/arenda",
    props: true,
    component: () => lazyLoad(import("@/modules/Training/pages/ArendaPage.vue")),
  },
  {
    name: "training-card",
    path: "/training/:id",
    props: true,
    component: () => lazyLoad(import("@/modules/Training/pages/TrainingPage.vue")),
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
