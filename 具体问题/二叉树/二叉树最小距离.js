// 给你一棵所有节点为非负值的二叉搜索树，请你计算树中任意两节点的差的绝对值的最小值。


// 示例：

// 输入：

//    1
//     \
//      3
//     /
//    2

// 输出：
// 1

// 解释：
// 最小绝对差为 1，其中 2 和 1 的差的绝对值为 1（或者 2 和 3）。
//  

// 提示：

// 树中至少有 2 个节点。


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const getMinimumDifference = function (root) {
  if (!root) return
  const tempArr = []
  let min = Infinity
  const postOrder = node => {
    if (!node) return
    postOrder(node.left)
    postOrder(node.right)
    // 计算最小min
    if (tempArr.length > 0) {
      tempArr.forEach(v => {
        const cur = Math.abs(v - node.val)
        if (cur < min) {
          min = cur
        }
      })
    }
    tempArr.push(node.val)
  }
  postOrder(root)
  return min
}

const tree = {
  val: 1,
  right: {
    val: 3,
    left: {
      val: 2
    }
  }
}

console.log(getMinimumDifference(tree))
