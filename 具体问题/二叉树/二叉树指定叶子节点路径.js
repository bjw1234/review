let a = {
  val: 1,
  left: {
    val: 2
  },
  right: {
    val: 3
  }
};

function path(root, target) {
  if (!root) return 0
  let result = []

  // 判断当前元素是否存在于以node为根节点的子树中
  const inorder = (node) => {
    if (!node) return false
    const leftRet = inorder(node.left)
    if (leftRet) {
      result.unshift(node.val)
    }
    const rightRet = inorder(node.right)
    if (rightRet) {
      result.unshift(node.val)
    }
    if (!node.left && !node.right && target === node.val) {
      result.unshift(node.val)
      return true
    }
  }

  inorder(root)

  return result
}

const p = path(a, 3); // [1, 3]
console.log(p)