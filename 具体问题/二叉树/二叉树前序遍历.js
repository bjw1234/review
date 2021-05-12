/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
const preorderTraversal1 = function (root) {
  const result = []
  const preOrder = node => {
    if (!node) return
    result.push(node.val)
    preOrder(node.left)
    preOrder(node.right)
  }
  preOrder(root)
  return result
}

const preorderTraversal2 = function (root) {
  const stack = []
  const res = []
  stack.push(root)
  // push->根节点, 右节点 左节点
  while (stack.length) {
    const cur = stack.pop()
    res.push(cur.val)
    if (cur.right) stack.push(cur.right)
    if (cur.left) stack.push(cur.left)
  }

  return res
}

const root = {
  val: 5,
  left: { val: 4, left: { val: 1 }, right: { val: 2 } },
  right: { val: 6, left: { val: 7 }, right: { val: 8 } }
}

console.log(preorderTraversal1(root))
console.log(preorderTraversal2(root))

