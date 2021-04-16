//    4           4
//   2 7   -->   7 2
// 1 3 6 9     9 6 3 1

// 226号问题
const invertTree = (root) => {
  if (root === null) return root

  root.left = invertTree(root.left)
  root.right = invertTree(root.right)

  const temp = root.left
  root.left = root.right
  root.right = temp

  return root
}


// 112 path Sum 根节点到叶子节点是否存在一个路径，路径的和为sum
const pathSum = (root, sum) => {
  if (!root) return false

  if (root.left === null && root.right === null) { // 叶子节点
    return root.val === sum
  }

  if (pathSum(root.left, sum - root.val)) {
    return true
  }

  if (pathSum(root.right, sum - root.val)) {
    return true
  }
  return false
}

// 111
const minDepth = (root) => {
  if (root === null) return 0

  if (root.left === null) {
    return minDepth(root.right) + 1
  } else if (root.right === null) {
    return minDepth(root.left) + 1
  } else {
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1
  }
}