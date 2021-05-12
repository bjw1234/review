// 右视图，意味着每层只能看到一个节点
// 每层至少添加一个节点（靠右），arr.length === level
// 右子树优先，结果数组长度 = 元素层级
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const rightSideView = function (root) {
  const res = []
  const traverse = (node, level) => {
    if (!node) return
    // 要不要添加节点，取决于当前层级是否和数组长度相等
    if (level === res.length) {
      res.push(node.val)
    }
    level += 1
    traverse(node.right, level)
    traverse(node.left, level)
  }
  traverse(root, 0)
  return res
};

const rightSideView2 = function (root) {
  if (!root) return []
  const res = []
  const temp = [] // 使用队列实现按照层级遍历
  temp.push(root)
  while (temp.length) {
    const level = [] // 当前层级
    const count = temp.length
    for (let i = 0; i < count; i++) {
      const cur = temp.shift()
      level.push(cur.val)
      if (cur.left) temp.push(cur.left)
      if (cur.right) temp.push(cur.right)
    }
    // 只添加最右侧节点
    res.push(level[level.length - 1])
  }
  return res
}

const root = {
  val: 5,
  left: { val: 4, left: { val: 1 }, right: { val: 2 } },
  right: { val: 6, left: { val: 7 }, right: { val: 8 } }
}

console.log(rightSideView(root))
console.log(rightSideView2(root))