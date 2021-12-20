export const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
