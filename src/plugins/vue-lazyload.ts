import Vue from "vue";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  observer: true,
  error: "../images/error.png",
  loading: "../images/loading.gif",
  observerOptions: {
    rootMargin: "0px",
    threshold: 0.1,
  },
});
