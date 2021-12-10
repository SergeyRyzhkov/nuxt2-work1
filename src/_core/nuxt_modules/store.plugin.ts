const modulesImport = JSON.parse(`<%= JSON.stringify(options.modulesImport) %>`);

export default async ({ store }) => {
  // const modulesPr = getModulesPromises();
  // const modules = await Promise.all(modulesPr);

  const modules = await getModulesPromises();

  modules.forEach((iter: any) => {
    if (!!iter && iter.name) {
      store.registerModule(iter.name, iter);
    }
  });
};

const getModulesPromises = async () => {
  const modules = [];
  if (!!modulesImport) {
    for (const iter of modulesImport) {
      const part = iter.split("modules")[1];
      // @ts-ignore
      modules.push(await lazyLoad(import(`../src/modules${part}`)));
    }
  }

  return modules;
};

export const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
