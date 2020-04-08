// 测试用例
// const arr = [3, 5, 3, 0, 8, 6, 1, 5, 8, 6, 2, 4, 9, 4, 7, 0, 1, 8, 9, 7, 3, 1, 2, 5, 9, 7, 4, 0, 2, 6]

const test = (func: Function) => {
  const arr = []
  const dataLen = 10000000
  for (let i = 0; i < dataLen; i++) {
    arr.push(Math.random() * 1000)
  }
  let s, e, ret;
  s = Date.now()
  ret = func(arr)
  e = Date.now()
  console.log(`${arr.length} data : ${func.name} time is: ${e - s} ms`)
}

// 给function定义名称
interface Function {
  readonly name: string
}


// 堆排序
// 思想：构造最大堆，循环取堆顶元素
function heapSort(arr: number[]): number[] {
  if (arr.length === 0) return []

  const data = arr.slice()
  const leftChildIdx = (i) => (2 * i + 1)
  const rightChildIdx = (i) => (2 * i + 2)
  const parentIdx = (i) => Math.floor((i - 1) / 2)
  const sweap = (i, j) => [data[i], data[j]] = [data[j], data[i]]
  const extraTop = () => {
    const ret = data[0]
    sweap(0, data.length - 1)
    data.pop()
    siftDown(0)
    return ret
  }

  const siftDown = (i) => {
    while (leftChildIdx(i) < data.length) {
      let largeIdx = 0
      if (rightChildIdx(i) < data.length && data[leftChildIdx(i)] < data[rightChildIdx(i)]) {
        largeIdx = rightChildIdx(i)
      } else {
        largeIdx = leftChildIdx(i)
      }

      if (data[i] <= data[largeIdx]) {
        sweap(i, largeIdx)
        i = largeIdx
      } else {
        break
      }
    }
  }

  // 从最后一个非叶子节点开始遍历
  for (let i = parentIdx(data.length - 1); i >= 0; i--) {
    siftDown(i)
  }

  const ret = []
  while (data.length > 0) {
    ret.push(extraTop())
  }

  return ret
}

// const ret = heapSort(arr)
// console.log(ret)


// 冒泡排序
// 思想：双重循环，当前数和后一个数比较
function bubbleSort(arr: number[]): number[] {
  const data = arr.slice()
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (data[i] < data[j]) {
        [data[i], data[j]] = [data[j], data[i]]
      }
    }
  }
  return data
}

// const ret = bubbleSort(arr)
// console.log(ret)


// 选择排序
// 思想：找出剩余数组中最大的元素下标，和首位元素交换
function selectSort(arr: number[]): number[] {
  const data = arr.slice()
  for (let i = 0; i < data.length; i++) {
    let maxValIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (data[j] < data[maxValIndex]) {
        maxValIndex = j
      }
    }
    [data[i], data[maxValIndex]] = [data[maxValIndex], data[i]]
  }
  return data
}

// const ret = selectSort(arr)
// console.log(ret)


// 插入排序
// 思想：取出下一个元素，在已经排序的元素中从后向前扫描
function insertSort(arr: number[]): number[] {
  const data = arr.slice()
  for (let i = 1; i < data.length; i++) {
    for (let j = i; j > 0; j--) {
      if (data[j] > data[j - 1]) {
        [data[j], data[j - 1]] = [data[j - 1], data[j]]
      } else {
        break
      }
    }
  }
  return data
}

// const ret = insertSort(arr)
// console.log(ret)


// 归并排序
// 思想：将数据分成两份，分别排序然后合并
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr
  const merge = (left: number[], right: number[]) => {
    const temp: number[] = []
    while (left.length > 0 && right.length > 0) {
      if (left[0] < right[0]) {
        temp.push(right.shift())
      } else {
        temp.push(left.shift())
      }
    }
    return temp.concat(left, right)
  }
  let middleIndex = Math.floor(arr.length / 2)
  let leftArr = arr.slice(0, middleIndex)
  let rightArr = arr.slice(middleIndex, arr.length)

  return merge(mergeSort(leftArr), mergeSort(rightArr))
}

// const ret = quickSort(arr)
// console.log(ret)


// 快速排序 递归方式大于100万栈超出了
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr
  const data = arr.slice()
  const middleVal = data.pop()
  const left = []
  const right = []
  data.forEach(val => {
    if (val > middleVal) {
      right.push(val)
    } else {
      left.push(val)
    }
  })
  return quickSort(left).concat(middleVal, ...quickSort(right))
}

function quickSort2(arr: number[], left = 0, right = arr.length - 1) {
  let partitionIdx;
  const sweap = (arr, i, j) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  const partition = function (a, l, r) {
    // 把基准值设置为第一个元素
    // 从第一个元素后面那个元素开始
    // 重要：可以把index理解为实际基准值的下一个位置  index-1就是实际基准值的位置
    let pivot = l, index = pivot + 1
    // [(5),3,4,7,8]
    for (let i = index; i <= r; i++) {
      // 当前值和基准值依次比较
      if (a[i] < a[pivot]) {
        // 交换当前值和index位置
        [a[i], a[index]] = [a[index], a[i]]
        // sweap(a, i, index)
        // index 移动 i 移动
        index++
      }
    }
    [arr[pivot], arr[index - 1]] = [arr[index - 1], arr[pivot]]
    // sweap(arr, pivot, index - 1)
    return index - 1
  }
  if (left < right) {
    // 数据分区，返回基准值位置
    partitionIdx = partition(arr, left, right)
    quickSort2(arr, left, partitionIdx - 1)
    quickSort2(arr, partitionIdx + 1, right)
  }
  return arr
}


// const ret = quickSort(arr)
// console.log(ret)


// 希尔排序 插入排序的优化版本
// 选择一个增量序列，按照增量序列个数K，对序列进行K趟排序
// 每趟排序根据对应的增量，将待排序列分割成若干长度为m的子序列，分别插入排序，仅增量因子为1时，
// 整个序列作为一个表来处理
function shellSort(arr: number[]): number[] {
  let current
  let gap = Math.floor(arr.length / 3)
  // 让gap位于数据三分之一处
  // while (gap < arr.length / 3) {
  //   gap = gap * 3 + 1
  // }
  for (; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < arr.length; i++) {
      current = arr[i]
      let j = i - gap
      for (; j >= 0 && arr[j] > current; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = current
    }
  }
  return arr
}

function shellSort2(arr: number[]): number[] {
  const len = arr.length
  // 增量递减
  for (let gap = Math.floor(len / 3); gap > 0; gap = Math.floor(gap / 3)) {
    // 从增量位置循环
    for (let i = gap; i < len; i++) {
      let j = i - gap
      const current = arr[i]
      while (j >= 0 && current < arr[j]) {
        arr[j + gap] = arr[j]
        j = j - gap
      }
      arr[j + gap] = current
    }
  }
  return arr
}

// const ret = shellSort2(arr)
// console.log(ret)



// 计数排序
// 思想：统计每个数字出现的次数，并将其放在数组对应的位置上
// 然后遍历形成的数据，反查出数据
function countSort(arr: number[]): number[] {
  const bucket = []
  for (let i = 0; i < arr.length; i++) {
    if (!bucket[arr[i]]) {
      bucket[arr[i]] = 0
    }
    bucket[arr[i]]++
  }

  const ret = []
  for (let i = 0; i < bucket.length; i++) {
    while (bucket[i] > 0) {
      ret.push(i)
      bucket[i]--
    }
  }

  return ret
}

// const ret = countSort(arr)
// console.log(ret)


// 桶排序
// 桶排序是计数排序的升级版


// 基数排序：根据键值的每位数字来分配桶
// 计数排序：每个桶只存储单一键值
// 桶排序：每个桶存储一定范围的数值

// test(heapSort)
// test(bubbleSort)
// test(selectSort)
// test(insertSort)
// test(mergeSort)
// test(quickSort) // 百万数据 快排栈超出
test(quickSort2)
test(shellSort)
test(shellSort2)
// test(countSort)
// 桶排，基数排序

/**
 *  100000 data : heapSort time is: 37 ms
    100000 data : bubbleSort time is: 16143 ms
    100000 data : selectSort time is: 6838 ms
    100000 data : insertSort time is: 9029 ms
    100000 data : mergeSort time is: 748 ms
    100000 data : quickSort time is: 119 ms
    100000 data : quickSort2 time is: 24 ms
    100000 data : shellSort time is: 23 ms
    100000 data : countSort time is: 151 ms
 */


// 1000万个随机数！！！
// 10000000 data : heapSort time is: 4892 ms
// 10000000 data : quickSort2 time is: 1767 ms
// 10000000 data : shellSort time is: 3220 ms
// 10000000 data : shellSort2 time is: 3458 ms

// 可以看到快排的速度是最快的
