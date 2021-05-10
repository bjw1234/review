/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
const levelOrder = function (root) {
  const result = []

  const temp = []
  temp.push(root)
  while (temp.length > 0) {
    const level = []
    const count = temp.length
    // 遍历当前层级所有节点
    for (let i = 0; i < count; i++) {
      const current = temp.shift()
      level.push(current.val)

      if (current.left) temp.push(current.left)
      if (current.right) temp.push(current.right)
    }
    result.push(level)
  }

  return result
};