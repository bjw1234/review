function heapSorts(arr) {
  const leftChildIdx = i => i * 2 + 1
  const rightChildIdx = i => i * 2 + 2
  const parentIdx = i => Math.floor((i - 1) / 2)
  const getTop = () => {
    const temp = arr[0]
    sweap(0, arr.length - 1)
    arr.pop()
    siftDown(0)
    return temp
  }
  const sweap = (i, j) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  const siftDown = (i) => {
    while (leftChildIdx(i) < arr.length) { // 最大下沉限制
      // 大顶堆， 小元素下沉 当前元素 和 子节点最大元素比较
      let maxChildIdx = leftChildIdx(i)
      if (rightChildIdx(i) < arr.length && arr[leftChildIdx(i)] < arr[rightChildIdx(i)]) {
        maxChildIdx = rightChildIdx(i)
      }
      if (arr[i] <= arr[maxChildIdx]) {
        sweap(i, maxChildIdx)
        i = maxChildIdx
      } else {
        break
      }
    }
  }
  // 从后往前下沉 heapify
  for (let i = parentIdx(arr.length - 1); i >= 0; i--) {
    siftDown(i)
  }
  console.log(arr)

  const ret = []
  while (arr.length > 0) {
    ret.push(getTop())
  }
  console.log(ret)
  return ret
}

heapSorts([5, 2, 8, 4, 1, 9])
