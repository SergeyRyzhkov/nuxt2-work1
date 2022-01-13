import MemoryCache from "./MemoryCache";

const cache = new MemoryCache();

const Cacheable =
  (maxAge = 2000) =>
  (_target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const key = `${propertyKey}-${!!args ? JSON.stringify(args) : ""}`;
      const val = cache.get(key);
      if (!val) {
        const originVal = await originalMethod.apply(this, args);
        cache.set(key, originVal, maxAge);
        return originVal;
      } else {
        return val;
      }
    };

    return descriptor;
  };

export default Cacheable;
