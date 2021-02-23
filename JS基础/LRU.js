// Latest Recently Used  最近最少使用（淘汰策略）
// 淘汰算法
// 获取数据 - get  写入数据 put
// 使用数组实现 get 和 put的时间复杂度都是 O(n) 级别

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cachesKeys = []
    this.caches = {}
  }

  put(key, value) {
    // 判断当前key是否存在
    const idx = this.cachesKeys.findIndex(k => k === key)
    if (idx > -1) { // 存在
      this.moveIdxLatest(idx)
    } else { // 不存在
      if (this.capacity === this.cachesKeys.length) { // 满了
        delete this.caches[this.cachesKeys[0]]
        this.cachesKeys.shift()
      }
      this.cachesKeys.push(key)
    }
    this.caches[key] = value
    console.log(this.cachesKeys, this.caches)
  }

  get(key) {
    const idx = this.cachesKeys.findIndex(k => k === key)
    if (idx === -1) { // 不存在
      return idx
    }
    this.moveIdxLatest(idx)
    return this.caches[key]
  }

  moveIdxLatest(idx) {
    const idxKey = this.cachesKeys[idx]
    this.cachesKeys.push(idxKey)
    this.cachesKeys.splice(idx, 1)
  }
}

const cache = new LRUCache(2 /* 缓存容量 */);

cache.put(2, 6);
console.log(cache.get(1));
cache.put(1, 5);
cache.put(1, 2);
console.log(cache.get(2));
cache.put(4, 5);
console.log(cache.get(4));
