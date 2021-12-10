const modulesImport = JSON.parse(`<%= JSON.stringify(options.modulesImport) %>`);

export default async ({ store }) => {
  if (!!modulesImport) {
    for (const iter of modulesImport) {
      const part = iter.split("modules")[1];
      store.registerModule(iter.name, await lazyLoad(import(`../src/modules${part}`)));
    }
  }
};

export const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
