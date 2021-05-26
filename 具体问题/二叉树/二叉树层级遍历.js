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


// 层级遍历 - S型遍历
function levelOrderS(root) {
  const result = []
  const queue = []
  let level = 0 // 层级
  queue.push(root)
  while (queue.length > 0) {
    level += 1 // 记录当前层级，奇数行逆序，偶数行正序
    const len = queue.length
    const levelElement = []
    for (let i = 0; i < len; i++) {
      const ele = queue.shift()
      if (level % 2 === 0) { // 偶数行
        levelElement.push(ele.val)
      } else { // 奇数行
        levelElement.unshift(ele.val)
      }
      if (ele.left) queue.push(ele.left)
      if (ele.right) queue.push(ele.right)
    }
    result.push(...levelElement)
  }

  return result.join('')
}

// test
const root = {
  val: 'A',
  left: { val: 'B', left: { val: 'D' }, right: { val: 'E' } },
  right: { val: 'C', left: { val: 'F' }, right: { val: 'G' } }
}

//    A
//   B C
//  DE FG

// ABCGFED

console.log(levelOrderS(root))
