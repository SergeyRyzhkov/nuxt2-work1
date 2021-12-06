const routes = [
  {
    name: "login",
    path: "/login",
    component: () => lazyLoad(import("@/modules/Auth/pages/LoginPage.vue")),
  },
];

export default routes;

export const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
