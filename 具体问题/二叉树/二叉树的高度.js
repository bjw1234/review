

const maxDepth = (root) => {
  if (root === null) return 0

  const leftDepth = maxDepth(root.left)
  const rightDepth = maxDepth(root.right)

  // 这个 1 就是当前节点
  return Math.max(leftDepth, rightDepth) + 1
}
