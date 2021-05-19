// 后续遍历的二分搜索树，还原
/**
 * @param {array} arr 后续遍历的数组
 */
function getValue(arr) {
  return subProcess(arr, 0, arr.length - 1)
}

function Node(val) {
  this.val = val
  this.left = null
  this.right = null
}

function subProcess(arr, l, r) { // [l, r]
  if (l > r) return null

  const head = new Node(arr[r])
  if (l === r) return head

  // l < r 有多个节点
  let m = l - 1 // * 技巧点 应对只有右子树的情况，其他情况，m都会被赋值
  // for (let i = l; i < r; i++) {
  //   if (arr[i] < arr[r]) {
  //     m = i
  //   }
  // }

  // 用二分查找的方式去找
  let left = l, right = r
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (arr[mid] < arr[r]) { // 小于目标值，符合要求，继续找 => 就可以找到符合要求的最右侧的值
      m = mid
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  head.left = subProcess(arr, l, m)
  head.right = subProcess(arr, m + 1, r - 1)
  return head
}

console.log(getValue([1, 3, 4, 7, 6, 5]))