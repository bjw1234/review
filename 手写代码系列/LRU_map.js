// LRU 最近最少使用，缓存淘汰算法
// 其原理：如果一个资源最近很少访问，大概率以后也会很少被使用
// 所以：我们一个需要一个类似队列的数据结构，新加的放在队尾，已存在并且最近被访问则调整
// 位置至队尾，如果满了则从队头删除元素。同时还能支持key-value访问。所以使用了 Map 这种数据结构
// 之所以使用Map，一个非常重要的一点就是Map中的键值是有序的，所以这里的Map就不能使用对象代替
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
