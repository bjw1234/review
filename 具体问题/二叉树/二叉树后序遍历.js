/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const postorderTraversal = function (root) {
  if (!root) return []
  const stack = []
  const result = []
  let prev = null
  while (stack.length || root) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    if (!root.right || root.right === prev) {
      result.push(root.val)
      prev = root
      root = null
    } else {
      stack.push(root)
      root = root.right
    }
  }

  return result
}

const postorderTraversal2 = function (root) {
  const result = []
  const postOrder = node => {
    if (!node) return
    postOrder(node.left)
    postOrder(node.right)
    result.push(node.val)
  }
  postOrder(root)
  return result
}

const postorderTraversal3 = function (root) {
  const stack = []
  const res = []
  stack.push(root)
  while (stack.length) {
    const cur = stack.pop()
    res.push(cur.val)
    if (cur.left) stack.push(cur.left)
    if (cur.right) stack.push(cur.right)
  }

  return res.reverse()
}

// 前序变后序的思路：
// 前序是：中左右 -> 调整代码变成：中右左 -> 反转result数组：左右中

const root = {
  val: 5,
  left: { val: 4, left: { val: 1 }, right: { val: 2 } },
  right: { val: 6, left: { val: 7 }, right: { val: 8 } }
}

console.log(postorderTraversal(root))
console.log(postorderTraversal2(root))
console.log(postorderTraversal3(root))

