import type { Module } from "@nuxt/types";
import MemoryCache from "./src/_core/MemoryCache";

const rendererCacheModule: Module = function (_moduleOptions) {
  console.log(process.env.NODE_ENV);

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
    if (!MemoryCache.get(route)) {
      const result = await renderRoute(route, context);
      MemoryCache.set(route, result);
      return result;
    } else {
      return MemoryCache.get(route);
    }
  };
};

export default rendererCacheModule;
