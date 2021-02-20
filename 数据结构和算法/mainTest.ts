// 二叉堆，满的二叉树，所以可以用数组存储
// 任意节点的值不大于其父节点 - 最大堆
// type Comparable<T> = (a: T, b: T) => boolean
// class Heap<T> {
//   private data: T[]
//   private compare: Comparable<T>

//   constructor(compare: Comparable<T>) {
//     this.compare = compare
//     this.data = new Array<T>()
//   }

//   getSize() {
//     return this.data.length
//   }

//   isEmpty() {
//     return this.data.length === 0
//   }

//   leftChildIdx(i) {
//     return i * 2 + 1
//   }

//   rightChildIdx(i) {
//     return i * 2 + 2
//   }

//   parentIdx(i) {
//     return Math.floor((i - 1) / 2)
//   }

//   getTop() {
//     return this.data[0]
//   }

//   sweap(i, j) {
//     const temp = this.data[i]
//     this.data[i] = this.data[j]
//     this.data[j] = temp
//   }

//   extraTop() {
//     const ret = this.getTop()
//     this.sweap(0, this.getSize() - 1)
//     this.data.pop()
//     this.siftDown(0)
//     return ret
//   }

//   // compare 默认 true 左边小于右边
//   // 元素上浮 - 最大堆 - 条件：当前元素大于父元素
//   siftUp(i) {
//     while (i > 0 && !this.compare(this.data[i], this.data[this.parentIdx(i)])) {
//       this.sweap(i, this.parentIdx(i))
//       i = this.parentIdx(i)
//     }
//   }

//   // 元素下沉 最大堆 条件：当前元素 小于 子节点中最大的那个元素
//   // 和子元素中较大的比较
//   siftDown(i) {
//     while (this.leftChildIdx(i) < this.getSize()) { // 下沉次数
//       const leftIdex = this.leftChildIdx(i)
//       let maxChildIndex = 0 // 最大元素的下标
//       if (leftIdex + 1 < this.data.length && this.compare(this.data[leftIdex], this.data[leftIdex + 1])) {
//         maxChildIndex = leftIdex + 1
//       } else {
//         maxChildIndex = leftIdex
//       }

//       // 判断是否需要下沉  - 当前元素 小于 最大的子元素
//       if (this.compare(this.data[i], this.data[maxChildIndex])) {
//         this.sweap(i, maxChildIndex)
//         i = maxChildIndex
//       } else {
//         break
//       }
//     }
//   }

//   // 构造最大堆
//   heapify(arr: T[]) {
//     this.data = arr
//     // 从后往前下沉
//     for (let i = this.parentIdx(this.data.length - 1); i >= 0; i--) {
//       this.siftDown(i)
//     }

//     // 从前往后上浮
//     // for (let i = 0; i < this.data.length; i++) {
//     //   this.siftUp(i)
//     // }
//   }

// }

// // a <= b 最大堆; a >= b 最大堆
// const binaryHeap = new Heap<number>((a: number, b: number) => a >= b)
// // 创建测试用例
// const testArray = []
// for (let i = 0; i < 100; i++) {
//   testArray.push(Math.round((Math.random() * 1000)))
// }

// binaryHeap.heapify(testArray)

// const finalArray = []
// for (let i = 0; i < testArray.length; i++) {
//   finalArray.push(binaryHeap.extraTop())
// }

// console.log(finalArray)


// function insert(node: Node) {
//   if (!this.root) {
//     this.root = node
//   } else {
//     this.root = this._insertNode(this.root, node)
//   }
// }

// function _insertNode(root, node) {
//   if (node.val > root.val) { // right
//     if (!root.right) {
//       root.right = node
//     } else {
//       this._insertNode(root.right, node)
//     }
//   } else { // left

//   }
// }

// function min() {
//   return _min(this.root).val;
// }

// function _min(root) {
//   if (root && root.left) {
//     return _min(root.left)
//   } else {
//     return root
//   }
// }

// // preOrder inOrder postOrder

// function _isContain(root, key) {
//   if (!root) return false
//   if (root.val === key) return true
//   if (key > root.key) {
//     return _isContain(root.right, key)
//   } else {
//     return _isContain(root.left, key)
//   }
// }

// function levelOrder() {
//   const sequence = []
//   sequence.push(this.root)

//   while (sequence.length) {
//     const node = sequence.shift()
//     console.log(node.val)
//     if (node.left) {
//       sequence.push(node.left)
//     }
//     if (node.right) {
//       sequence.push(node.right)
//     }
//   }
// }

// // BinaryTree
// function _remove(node, val) {
//   if (node === null) return node
//   if (node.key === val) {
//     if (!node.right && !node.left) {
//       node = null
//       return node
//     } else if (node.left && !node.right) {
//       node = node.left
//       return node
//     } else if (!node.left && node.right) {
//       node = node.right
//       return node
//     } else {
//       const minNode = this._min(node.right)
//       node.key = minNode.key
//       this._remove(node.right, minNode.key)
//       return node
//     }

//   } else if (val > node.key) {
//     node.right = this._remove(node.right, val)
//     return node
//   } else if (val < node.key) {
//     node.left = this._remove(node.left, val)
//     return node
//   }
// }

// interface Stack<T> {
//   push(val: T)
//   pop(): T
//   isEmpty(): boolean
//   getSize(): number
// }

// class CNode<T> {
//   val: T
//   next: CNode<T>

//   constructor(val, next) {
//     this.val = val
//     this.next = next
//   }
// }

// type func<T> = (value: T) => void

// class LinkedListStack<T> implements Stack<T> {
//   private root: CNode<T>
//   private length: number

//   constructor() {
//     this.length = 0
//     this.root = new CNode<T>(undefined, null)
//   }

//   push(val: T) {
//     const newNode = new CNode<T>(val, this.root)
//     this.root = newNode
//     this.length += 1
//   }
//   pop(): T {
//     if (this.isEmpty()) return undefined
//     const current = this.root.val
//     this.root = this.root.next
//     this.length -= 1
//     return current
//   }

//   isEmpty(): boolean {
//     return this.length === 0
//   }

//   getSize(): number {
//     return this.length
//   }

//   forEach(func: func<T>) {
//     if (typeof func !== 'function') {
//       throw new TypeError('params must is a function.')
//     }
//     let current = this.root
//     for (let i = 0; i < this.getSize(); i++) {
//       func(current.val)
//       current = current.next
//     }
//   }
// }

// const stack = new LinkedListStack<string>()
// stack.push('hello0')
// stack.push('hello1')
// stack.push('hello2')
// stack.forEach((value) => {
//   console.log(value);
// })
// console.log("getSize:", stack.getSize())
// console.log("isEmpty", stack.isEmpty())
// console.log("pop", stack.pop())
// console.log("pop", stack.pop())
// console.log("pop", stack.pop())
// console.log("pop", stack.pop())
// console.log("getSize", stack.getSize())





















