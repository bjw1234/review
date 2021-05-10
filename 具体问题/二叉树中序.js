/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 使用递归的方式
const inorderTraversal = function (root) {
  let ret = []
  const inorder = (node) => {
    if (!node) return
    inorder(root.left)
    ret.push(root.val)
    inorder(root.right)
  }
  inorder(root)
  return ret
};

// 使用循环的方式
const inorderTraversal2 = function (root) {
  const ret = []
  const stack = [] // 模拟调用栈
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    const cur = stack.pop()
    ret.push(cur.val)
    root = cur.right
  }

  return ret
}