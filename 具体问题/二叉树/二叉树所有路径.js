/**
    输入:

      1
    /   \
    2     3
    \
      5
    [[2,5]], [[3]] => [ [1,2,5], [1,3] ]
    输出: ["1->2->5", "1->3"]

    解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
 */
const root = {
  val: 1,
  left: { val: 2, right: { val: 5 } },
  right: { val: 3 },
}
const binaryTreePaths = function (root) {
  if (!root) return []
  const tarverse = node => {
    if (!node) return []
    if (!node.left && !node.right) { //叶子
      return [[node.val]]
    }
    const leftRet = tarverse(node.left)
    const rightRet = tarverse(node.right)
    for (let i = 0; i < leftRet.length; i++) {
      const element = leftRet[i]
      element.unshift(node.val)
    }
    for (let i = 0; i < rightRet.length; i++) {
      const element = rightRet[i]
      element.unshift(node.val)
    }

    return [...leftRet, ...rightRet]
  }
  const res = tarverse(root)
  return res.map(item => item.join('->'))
}

console.log(binaryTreePaths(root))
