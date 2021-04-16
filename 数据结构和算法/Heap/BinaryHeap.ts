export interface Comparable<T> {
  (a: T, b: T): boolean
}

/**
 * 如果根节点存储在数组下标为0的位置
 * 
 *            5(0)
 *         /        \
 *      6(1)        9(2)
 *      /   \      /    \
 *    8(3)  2(4)  7(5)  1(6)
 *
 * const leftChildIdx = idx => idx * 2 + 1;
 * const rightChildIdx = idx => idx * 2 + 2;
 * const parentIdex = idx => Math.floor((idx - 1) / 2);
 */

/**
 * 二叉堆是完全二叉树，完全二叉树可以用数组的方式实现
 * 故而完全二叉树的实现就可以绕过二叉树的定义（不使用left,right这样的定义）
 * 这样做的好处就是可以根据索引判断父子关系
 */
export default class BinaryHeap<T> {

  private data: T[]
  // compare 函数
  private compare: Comparable<T>

  constructor(compare: Comparable<T>) {
    this.data = new Array<T>()
    this.compare = compare
  }

  getData(): T[] {
    return this.data
  }

  getSize(): number {
    return this.data.length
  }

  isEmpty(): boolean {
    return this.data.length === 0
  }

  private leftChildIdx(i): number {
    return 2 * i + 1
  }

  private rightChildIdx(i): number {
    return 2 * i + 2
  }

  private parentIdx(i): number {
    return Math.floor((i - 1) / 2)
  }

  add(t: T) {
    this.data.push(t)
    this.siftUp(this.getSize() - 1)
  }

  getTop() {
    return this.data[0]
  }

  // 拿出堆顶元素
  // 末尾元素覆盖堆顶
  // 下沉根元素
  extraTop() {
    const ret = this.getTop()
    this.sweap(0, this.getSize() - 1)
    this.data.pop()
    this.siftDown(0)
    return ret
  }

  // 第i个元素上浮 和 父元素比较
  siftUp(i): void {
    // 当前元素 大于父元素
    while (i > 0 && this.compare(this.data[i], this.data[this.parentIdx(i)]) === true) {
      this.sweap(i, this.parentIdx(i))
      i = this.parentIdx(i)
    }
  }

  // 第i个元素下沉 和 子元素中较大的比较
  siftDown(i): void {
    while (this.leftChildIdx(i) < this.data.length) {
      const j = this.leftChildIdx(i)
      let maxValIdx = 0
      // 右节点存在 且左节点小于右节点
      if ((j + 1) < this.data.length && this.compare(this.data[j], this.data[j + 1]) === false) {
        maxValIdx = j + 1
      } else {
        maxValIdx = j
      }
      // 判断是否下沉
      if (this.compare(this.data[i], this.data[maxValIdx]) === false) {
        this.sweap(i, maxValIdx)
        i = maxValIdx
      } else {
        break
      }
    }
  }

  // 构造最大堆
  heapify(arr: T[]) {
    // nlogn 复杂度
    // for (let i = 0; i < arr.length; i++) {
    //   this.add(arr[i])
    // }
    this.data = arr
    for (let i = this.parentIdx(this.data.length - 1); i >= 0; i--) {
      this.siftDown(i)
    }
  }

  sweap(i: number, j: number) {
    const temp = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
  }
}

// a <= b 最小堆; a >= b 最大堆
const binaryHeap = new BinaryHeap<number>((a: number, b: number) => a <= b)
// 创建测试用例
const testArray = []
for (let i = 0; i < 100; i++) {
  testArray.push(Math.round((Math.random() * 1000)))
}

binaryHeap.heapify(testArray)

const finalArray = []
for (let i = 0; i < testArray.length; i++) {
  finalArray.push(binaryHeap.extraTop())
}

console.log(finalArray)

//检查一下这个 arr 是否是降序的
for (let i = 1; i < finalArray.length; i++) {
  if (finalArray[i - 1] > finalArray[i]) {
    //说明不是降序的，堆实现有问题
    throw new Error(`Error: ${finalArray[i - 1]} > ${finalArray[i]}`);
  }
}

console.log(binaryHeap.getSize())
