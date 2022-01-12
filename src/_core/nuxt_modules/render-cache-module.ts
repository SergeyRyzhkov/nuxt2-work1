// import fs from "fs";
import type { Module } from "@nuxt/types";

const cache = {};

const rendererCacheModule: Module = function (_moduleOptions) {
  const renderer = this.nuxt.renderer;

  const renderRoute = renderer.renderRoute.bind(renderer);

  renderer.renderRoute = async function (route, context) {
    if (!cache[route]) {
      const result = await renderRoute(route, context);
      cache[route] = result;

      // fs.appendFileSync("test.txt", serialize(result));

      return result;
    } else {
      // fs.appendFileSync("test.txt", "    found  ");
      return cache[route];
    }
  };
};

export default rendererCacheModule;

// const serialize = (result) => {
//   return JSON.stringify(result, (_key, value) => {
//     if (typeof value === "object" && value instanceof Set) {
//       return { _t: "set", _v: [...value] };
//     }

//     if (typeof value === "function") {
//       return { _t: "func", _v: value() };
//     }

//     return value;
//   });
// };
// const deserialize = (jsoned) => {
//   return JSON.parse(jsoned, (_key, value) => {
//     if (value && value._v) {
//       if (value._t === "set") {
//         return new Set(value._v);
//       }

//       if (value._t === "func") {
//         const result = value._v;
//         return () => result;
//       }
//     }

//     return value;
//   });
// };
