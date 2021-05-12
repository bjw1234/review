/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 使用递归的方式
const inorderTraversal = function (root) {
  let ret = []
  const inorder = (node) => {
    if (!node) return
    inorder(node.left)
    ret.push(node.val)
    inorder(node.right)
  }
  inorder(root)
  return ret
};

// 使用循环的方式
const inorderTraversal2 = function (root) {
  const ret = []
  const stack = [] // 模拟调用栈
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    const cur = stack.pop()
    ret.push(cur.val)
    root = cur.right
  }

  return ret
}

// 借助中间变量的方式
const inorderTraversal3 = function (root) {
  const res = []
  const stack = []
  let cur = root // cur -> root 指向 root 节点
  while (stack.length || cur) {
    if (cur) { // 访问左子树
      stack.push(cur)
      cur = cur.left
    } else { // 访问中间节点和右子树
      cur = stack.pop()
      res.push(cur.val)
      cur = cur.right
    }
  }
  return res
}

const root = {
  val: 5,
  left: { val: 4, left: { val: 1 }, right: { val: 2 } },
  right: { val: 6, left: { val: 7 }, right: { val: 8 } }
}

console.log(inorderTraversal(root))
console.log(inorderTraversal2(root))
console.log(inorderTraversal3(root))