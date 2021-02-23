class LRUCacheMap {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
  }

  get(key) {
    const cache = this.cache
    if (cache.has(key)) {
      const value = cache.get(key)
      cache.delete(key)
      cache.set(key, value)
      return value
    }
    return -1
  }

  put(key, value) {
    const cache = this.cache
    if (cache.has(key)) {
      cache.delete(key)
    } else if (cache.size >= this.capacity) { // 无，满了
      cache.delete(cache.keys().next().value)
    }
    cache.set(key, value)
  }
}


const cache = new LRUCacheMap(2 /* 缓存容量 */);

cache.put(2, 6);
console.log(cache.get(1)); // -1
cache.put(1, 5);
cache.put(1, 2);
console.log(cache.get(1)); // 2
console.log(cache.get(2)); // 6
