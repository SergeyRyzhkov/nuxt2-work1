import type { Module } from "@nuxt/types";
import MemoryCache from "./src/_core/MemoryCache";

const cache = new MemoryCache();

const rendererCacheModule: Module = function (_moduleOptions) {
  if (process.env.NODE_ENV === "development") {
    return;
  }

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
      cache.set(route, result);
      return result;
    } else {
      return cache.get(route);
    }
  };
};

export default rendererCacheModule;
