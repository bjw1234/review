// 给定一个非空数组，返回前k哥出现频率最高的元素。
// 注意k的合法性
// k个元素的优先队列
const PriorityQueue = require('../数据结构和算法/Queue/PriorityQueue.js').default

const topKFrequent = (nums, k) => {
  if (k <= 0) return
  const freq = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (freq.has(nums[i])) {
      freq.set(nums[i], freq.get(nums[i]) + 1)
    } else {
      freq.set(nums[i], 1)
    }
  }

  // 创建一个优先队列
  const queue = new PriorityQueue((a, b) => {
    if (a.count < b.count) return true
    return false
  })

  for (let [key, value] of freq) {
    console.log('k-v', key, value)
    queue.enqueue({ key: key, count: value })
    if (queue.getSize() === k + 1) {
      queue.dequeue()
    }
  }

  console.log(queue.getData())
  return queue.getData().reduce((acc, current) => {
    acc.push(current.key)
    return acc;
  }, [])
}

const arr = [1, 1, 1, 2, 2, 3]
const resp = topKFrequent(arr, 2)
console.log('结果：', resp)