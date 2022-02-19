import Vue from "vue";
import Router from "vue-router";
import { parse, stringify } from "query-string";

const routesImport = JSON.parse(`<%= JSON.stringify(options.routesImport) %>`);

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};

const getRoutes = async () => {
  const routes = [];
  if (!!routesImport) {
    for (const iter of routesImport) {
      const part = iter.split("modules")[1];
      // @ts-ignore
      routes.push(...(await lazyLoad(import(`../src/modules${part}`))));
    }
  }

  return routes;
};

Vue.use(Router);

if (process.client) {
  window.history.scrollRestoration = "manual";
}

export async function createRouter() {
  const routes = await getRoutes();

  const router = new Router({
    mode: "history",
    routes: [...routes],

    scrollBehavior: (to, from, savedPosition) => {
      if (to.name !== from.name) {
        const position = savedPosition || { x: 0, y: 0 };
        return new Promise((resolve) => {
          window.$nuxt.$once("triggerScroll", () => {
            resolve(position);
          });
        });
      }
    },

    parseQuery(query) {
      return parse(query, { arrayFormat: "bracket" });
    },

    stringifyQuery(query) {
      const result = stringify(query, { arrayFormat: "bracket" });
      return result ? "?" + result : "";
    },
  });

  return router;
}
