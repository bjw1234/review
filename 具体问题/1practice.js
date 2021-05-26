// const containsNearbyDuplicate = function (nums, k) {
//   const set = new Set()
//   for (let index = 0; index < nums.length; index++) {
//     if (set.has(nums[index])) return true
//     set.add(nums[i])
//     if (set.length === k + 1) {
//       set.delete(nums[index - k])
//     }
//   }
// }

// const dichotomy = function (arr, target) {
//   if (!Array.isArray(arr)) return false
//   let left = 0, right = arr.length - 1 // [l ,r]
//   while (left < right) {
//     if (arr[left] + arr[right] < target) {
//       left++
//     } else if (arr[left] + arr[right] > target) {
//       right--
//     } else {
//       return [left, right]
//     }
//   }
//   return false
// }

// const arr = [2, 4, 6, 7, 8, 9];
// console.log('getValue', dichotomy(arr, 12)); // [1, 4]
// console.log('getValue', dichotomy(arr, 6)); // [0, 1]

// const maxDepth = function (tree) {
//   if (!tree) return 0
//   const leftH = maxDepth(tree.left)
//   const rightH = maxDepth(tree.right)
//   return Math.max(leftH, rightH) + 1
// }

// const minDepth = function (tree) {
//   if (!tree) return 0

//   if (!tree.left) {
//     return minDepth(tree.right) + 1
//   }
//   if (!tree.right) {
//     return minDepth(tree.left) + 1
//   }
//   return Math.min(minDepth(tree.left), minDepth(tree.right)) + 1
// }

// const reverse = function (tree) {
//   if (!tree) return null
//   const leftReverse = reverse(tree.left)
//   const rightReverse = reverse(tree.right)
//   const tempLeft = leftReverse
//   tree.left = rightReverse
//   tree.right = tempLeft
//   return tree
// }

// const sum = function (tree, target) {
//   if (!tree) return false
//   // 叶子节点
//   if (!tree.left && !tree.right) {
//     return tree.value === target
//   }
//   if (sum(tree.left, target - tree.value)) {
//     return true
//   } else if (sum(tree.right, target - tree.value)) {
//     return true
//   }
//   return false
// }

// const binarySearch = function (arr, target) {
//   if (!Array.isArray(arr)) {
//     throw new Error('first params must array type.')
//   }
//   // assert 升序

//   let left = 0, right = arr.length // [l, r)
//   while (left < right) {
//     const val = Math.floor((left + right) / 2)
//     if (val < target) {
//       left = val + 1
//     } else if (val > target) {
//       right = val
//     } else {
//       return val
//     }
//   }
//   return -1
// }

// const sum = function (a, b) {
//   if (a === 0) return b
//   if (b === 0) return a
//   const base = a ^ b
//   const next = (a & b) << 1
//   return sum(base, next)
// }
// console.log(sum(12, 22)) // 34

// const isReverse = function (str) {
//   if (typeof str !== 'string') return false
//   let left = 0, right = str.length - 1 // [l, r]
//   while (left < right) {
//     const lc = str[left]
//     const rc = str[right]
//     if (!/[a-zA-Z]/.test(lc)) {
//       left++
//       continue
//     }
//     if (!/[a-zA-Z]/.test(rc)) {
//       right--
//       continue
//     }
//     if (lc.toLowerCase() === rc.toLowerCase()) {
//       left++
//       right--
//     } else {
//       return false
//     }
//   }
//   return true
// }

// console.log(isReverse('a,Bcb a, ')) // true
// console.log(isReverse('a')) // true

// const lengthOfLongestSubstring = function (str) {
//   const map = new Map()
//   let maxLen = 0, j = 0 // 最长子串起始位置
//   for (let i = 0; i < str.length; i++) {
//     const element = str[i]
//     if (map.has(element)) {
//       j = Math.max(map.get(element) + 1, j)
//     }

//     map.set(element, i)
//     maxLen = Math.max(maxLen, i - j + 1)
//   }
//   console.log(maxLen)
//   return maxLen
// }

// lengthOfLongestSubstring('aaa') // 1
// lengthOfLongestSubstring('abcacde') // 4
// lengthOfLongestSubstring('ababc') // 3

// function subTryRob(arr, idx) {
//   if (idx >= arr.length) return 0
//   let ret = 0
//   for (let i = idx; i < arr.length; i++) {
//     ret = Math.max(ret, arr[i] + subTryRob(arr, i + 2))
//   }

//   return ret
// }

// tryRob [i, n-1] max{v(0) + f(2), v(1) + f(3)...}
// function tryRob(arr) {
//   return subTryRob(arr, 0)
// }

// 求最短连续子数组的长度 和 >= target
// function minSubArrLen(arr, target) {
//   if (!Array.isArray(arr)) return 0
//   let left = 0, right = -1 // [l, r]
//   let tempSum = 0
//   let result = arr.length + 1 // 连续子数组最短长度
//   while (left < arr.length && right < arr.length) {
//     if (tempSum >= target) { // 满足
//       result = Math.min(result, right - left + 1)
//       tempSum -= arr[left]
//       left++
//     } else {
//       right++
//       tempSum += arr[right]
//     }
//   }

//   if (result === arr.length + 1) return 0
//   return result
// }

// const arrs = [2, 5, 7, 1, 7, 9]
// console.log('len', minSubArrLen(arrs, 9))

// function maxSubLength(arr) {
//   if (!Array.isArray(arr)) return 0
//   const sortedArr = Array.from(new Set(arr.sort((a, b) => a - b)))
//   let result = 0
//   let left = 0, right = 1 // [l, r]

//   // 升序 数组 且 i < j
//   const isContinue = (arr, i, j) => {
//     if (Array.isArray(arr) && (j - i + 1 === arr[j] - arr[i] + 1)) return true
//     return false
//   }

//   while (left < arr.length && right < arr.length) {
//     console.log(isContinue(sortedArr, left, right))
//     if (isContinue(sortedArr, left, right)) {
//       result = Math.max(result, right - left + 1)
//       right++
//     } else {
//       left = right
//       right += 1
//     }
//   }

//   return result
// }

// const arr = [2, 1, 4, 6, 4, 5, 3, 9]

// console.log(maxSubLength(arr))

// function strRange(str) {
//   if (str.length === 0) return []
//   if (str.length === 1) return [str]
//   const result = []
//   const restItems = strRange(str.slice(1))
//   for (let i = 0; i < restItems.length; i++) {
//     for (let j = 0; j < restItems[i].length + 1; j++) {
//       const temp = restItems[i].slice(0, j) + str[0] + restItems[i].slice(j)
//       result.push(temp)
//     }
//   }
//   return result
// }

// const arr = ['a', 'b', 'c', 'd']
// console.log(strRange(arr))

// class MyHeap {
//   constructor(arr, compare) {
//     // TODO 校验参数
//     this.arr = arr
//     this.compare = compare
//   }

//   leftChildIdx(i) {
//     return (i * 2) + 1
//   }

//   parentIdx(i) {
//     return Math.floor((i - 1) / 2)
//   }

//   // 取出堆顶元素
//   extraTop() {
//     const value = this.arr[0]
//     this.arr.shift()
//     this.siftDown(0)
//     return value
//   }

//   // 构建堆，从前往后，元素上浮
//   heapify() {
//     for (let i = 0; i < this.arr.length; i++) {
//       this.siftUp(i)
//     }
//   }

//   siftDown(i) {
//     // 最大堆，小元素下沉，当前和子元素较大的比较，如果小于较大的，则下沉
//     while (this.leftChildIdx(i) < this.arr.length) { // 下沉次数
//       const lcIdx = this.leftChildIdx(i)
//       const rcIdx = lcIdx + 1
//       let maxValIdx
//       if (rcIdx < this.arr.length && this.compare(this.arr[rcIdx], this.arr[lcIdx])) {
//         maxValIdx = rcIdx
//       } else {
//         maxValIdx = lcIdx
//       }
//       // 判断是否需要下沉
//       if (this.arr[i] < this.arr[maxValIdx]) {
//         this.sweap(i, maxValIdx)
//         i = maxValIdx
//       } else {
//         break
//       }
//     }
//   }

//   sweap(i, j) {
//     const temp = this.arr[i]
//     this.arr[i] = this.arr[j]
//     this.arr[j] = temp
//   }

//   siftUp(i) {
//     // 如果构建最大堆，大元素上浮，compare = false 左边值小于右边值
//     while (i > 0 && this.compare(this.arr[this.parentIdx(i)], this.arr[i])) {
//       this.sweap(i, this.parentIdx(i))
//       i = this.parentIdx(i)
//     }
//   }
// }

// const heap = new MyHeap([5, 1, 4, 7, 9, 0], (a, b) => a <= b)
// heap.heapify()
// console.log(heap.arr)

// 二叉树到指定叶子节点的路径
let a = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4 },
    right: { val: 7, right: { val: 8 } },
  },
  right: {
    val: 3
  }
};


// console.log(path(a, 8)) // [1, 3]


// 深度优先遍历，自上而下递归，自下而上回溯
// function path(root, val) {
//   const result = []

//   // 判断当前节点是否存在于该树中
//   const postOrder = root => {
//     if (!root) return false
//     const leftRet = postOrder(root.left)
//     const rightRet = postOrder(root.right)

//     if (leftRet || rightRet) {
//       result.unshift(root.val)
//     }

//     // 判断
//     if (root.val === val) {
//       result.unshift(root.val)
//       return true
//     }

//     return leftRet || rightRet
//   }

//   postOrder(root)
//   return result
// }

// 二叉树的中序遍历 - 循环
// function inOrder(root) {
//   let current = root
//   const temp = []
//   const ret = []
//   while (temp.length > 0 || current) {
//     while (current) {
//       temp.push(current)
//       current = current.left
//     }
//     current = temp.pop()
//     ret.push(current.val)
//     current = current.right
//   }

//   return ret
// }

// console.log(inOrder(a))


// 二叉树右视图
// 当前层级和元素个数得相等
// function rightView(root) {
//   const result = []
//   // 每层至少添加一个元素，右子树优先遍历
//   const traverse = (node, level) => {
//     if (!node) return

//     if (level === result.length) {
//       result.push(node.val)
//     }
//     const curLevel = level + 1
//     traverse(node.right, curLevel)
//     traverse(node.left, curLevel)
//   }

//   traverse(root, 0) // 第0层
//   return result
// }

// console.log(rightView(a))


// function rightView2(root) {
//   const result = []
//   const temp = []
//   let level = -1
//   temp.push(root)
//   while (temp.length) {
//     let len = temp.length
//     level += 1
//     for (let i = 0; i < len; i++) {
//       const node = temp.shift()
//       if (level === result.length) {
//         result.push(node.val)
//       }
//       if (node.right) temp.push(node.right)
//       if (node.left) temp.push(node.left)
//     }

//   }

//   return result
// }

// console.log('func2', rightView2(a))

// 获取二叉树节点所在的层级
// function getLevel(root, val) {
//   let level = 0
//   const temp = []
//   temp.push(root)
//   while (temp.length) {
//     level += 1
//     const len = temp.length
//     for (let i = 0; i < len; i++) {
//       const cur = temp.shift()
//       if (cur.val === val) {
//         return level
//       }
//       if (cur.left) temp.push(cur.left)
//       if (cur.right) temp.push(cur.right)
//     }
//   }
//   return level
// }

// function getLevel(root, val) {
//   const postOrder = (node, curLevel) => {
//     // level 判断 val
//     if (!node) return -1
//     const leftLevel = postOrder(node.left, curLevel + 1)
//     if (leftLevel !== -1) { // 找到了元素对应的层级
//       return leftLevel
//     }
//     const rightLevel = postOrder(node.right, curLevel + 1)
//     if (rightLevel !== -1) { // 找到了元素对应的层级
//       return rightLevel
//     }
//     if (node.val === val) {
//       return curLevel
//     }
//     return -1
//   }

//   return postOrder(root, 1)
// }

// console.log(getLevel(a, 7)) // 4

// class UnionFinds {
//   constructor(n) {
//     this.head = [] // 节点对应头结点
//     this.level = [] // 头节点 树的高度
//     for (let i = 0; i < n; i++) {
//       this.head[i] = i
//       this.level[i] = 1
//     }
//   }

//   // 合并两棵树
//   union(p, q) {
//     const proot = this.find(p)
//     const qroot = this.find(q)

//     if (proot === qroot) return
//     if (this.level[proot] < this.level[qroot]) {
//       this.head[proot] = qroot
//     } else if (this.level[proot] > this.level[qroot]) {
//       this.head[qroot] = proot
//     } else {
//       this.head[proot] = qroot
//       this.level[qroot] += 1
//     }
//   }

//   // 找到某个节点的头结点
//   find(x) {
//     if (this.head[x] === x) return x
//     // 路径压缩
//     this.head[x] = this.find(this.head[x])
//     return this.head[x]
//   }

//   isConnected(p, q) {
//     return this.head[p] === this.head[q]
//   }
// }

// const uf = new UnionFinds(6)
// uf.union(2, 3)
// uf.union(1, 3)
// console.log(uf.isConnected(1, 2))
// console.log(uf.isConnected(3, 2))

// function sum(a, b) {
//   if (b === 0) return a
//   if (a === 0) return b
//   const anum = a ^ b
//   const bnum = a & b << 1
//   return sum(anum, bnum)
// }

// console.log(sum(3, 44))


// type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
