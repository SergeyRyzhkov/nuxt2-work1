import type { Module } from "@nuxt/types";

const cache = {};

const rendererCacheModule: Module = function (_moduleOptions) {
  // if (process.env.NODE_ENV === "development") {
  //   return;
  // }

  // Fix for build
  if (!this.nuxt.renderer) {
    return;
  }

  const renderer = this.nuxt.renderer;
  // Save original
  const renderRoute = renderer.renderRoute.bind(renderer);

  renderer.renderRoute = async function (route, context) {
    if (!cache[route]) {
      const result = await renderRoute(route, context);
      cache[route] = result;
      return result;
    } else {
      return cache[route];
    }
  };
};

export default rendererCacheModule;
