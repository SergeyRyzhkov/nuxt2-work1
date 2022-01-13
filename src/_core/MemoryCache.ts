export default class MemoryCache {
  entriesMap = new Map<string, CacheEntry>();

  set(key: string, value: any, maxAge = 1000) {
    const entry = new CacheEntry(value, maxAge);
    this.entriesMap.set(key, entry);
  }

  get(key: string) {
    const val = this.entriesMap.get(key);
    if (!!val) {
      if (val.isExpaired()) {
        val.value = null;
        this.entriesMap.delete(key);
        return null;
      }
      return val.value;
    }
    return null;
  }
}

class CacheEntry {
  value: any;
  createdAt: number;
  maxAge: number;

  constructor(value: any, maxAge: number) {
    this.value = value;
    this.createdAt = Date.now();
    this.maxAge = maxAge;
  }

  isExpaired() {
    return Date.now() - this.createdAt > this.maxAge;
  }
}
