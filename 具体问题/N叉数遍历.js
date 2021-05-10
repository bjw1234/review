/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
const levelOrder = function (root) {
  if (!root) return []
  const result = []

  const tempQueue = []
  tempQueue.push(root)
  while (tempQueue.length) {
    const level = []
    const size = tempQueue.length
    for (let i = 0; i < size; i++) {
      const cur = tempQueue.shift()
      level.push(cur.val)
      tempQueue.push(...cur.children)
    }
    result.push(level)
  }

  return result
};