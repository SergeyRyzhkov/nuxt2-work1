const routes = [
  {
    name: "reset-password",
    path: "/login/:code",
    props: true,
    component: () => lazyLoad(import("@/modules/Auth/pages/ResetPassword.vue")),
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
