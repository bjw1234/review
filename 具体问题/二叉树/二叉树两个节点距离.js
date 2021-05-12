function distance(root, a, b) {
  // 计算 a， b 的距离
  const fatherNode = commonFatherNode(root, a, b)
  const disA = getDistance(root, a)
  const disB = getDistance(root, b)
  const disC = getDistance(root, fatherNode.val)
  const x = disA + disB - 2 * disC
  return x
}

function getDistance(root, val) {
  let level = 0
  const queue = []
  queue.push(root)
  while (queue.length > 0) {
    const size = queue.length
    level++
    for (let i = 0; i < size; i++) {
      const tempNode = queue.shift()
      if (tempNode.val === val) return level
      if (tempNode.left) queue.push(tempNode.left)
      if (tempNode.right) queue.push(tempNode.right)
    }
  }
  return -1
}

function commonFatherNode(root, a, b) {
  if (root === null || root.val === a || root.val === b) return root
  const left = commonFatherNode(root.left, a, b)
  const right = commonFatherNode(root.right, a, b)
  if (left === null && right === null) return null
  if (left === null) return right
  if (right === null) return left
  return root
}

let a = {
  val: 1,
  left: {
    val: 2
  },
  right: {
    val: 3
  }
}

console.log(distance(a, 3, 2))
