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