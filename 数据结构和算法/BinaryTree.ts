
export class Node {

  public key: number
  public left: Node
  public right: Node

  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

/**
 * 排序二叉树
 * 如果左子树不为空，则左子树上每个节点的值均小于根节点的值
 * 如果右子树不为空，则右子树上每个节点的值均大于根节点的值
 */
export class BinaryTree {

  private root: Node

  // 插入节点
  intert(node: Node) {
    if (!this.root) {
      this.root = node
    } else {
      this._insertNode(this.root, node)
    }
  }

  private _insertNode(root: Node, node: Node) {
    if (root.key < node.key) {
      if (root.right === null) {
        root.right = node
      } else {
        this._insertNode(root.right, node)
      }
    } else {
      if (root.left === null) {
        root.left = node
      } else {
        this._insertNode(root.left, node)
      }
    }
  }

  // 前序遍历
  prevOrderTranverse(cb: Function) {
    this._prevOrderTranverse(this.root, cb)
  }

  private _prevOrderTranverse(root: Node, cb: Function) {
    if (root !== null) {
      cb && cb(root.key)
      this._prevOrderTranverse(root.left, cb)
      this._prevOrderTranverse(root.right, cb)
    }
  }

  // 中序遍历
  inOrderTranverse(cb: Function) {
    this._inOrderTranverse(this.root, cb)
  }

  private _inOrderTranverse(root: Node, cb: Function) {
    if (root !== null) {
      this._inOrderTranverse(root.left, cb)
      cb && cb(root.key)
      this._inOrderTranverse(root.right, cb)
    }
  }

  // 后续遍历
  postOrderTranverse(cb: Function) {
    this._postOrderTranverse(this.root, cb)
  }

  private _postOrderTranverse(root: Node, cb: Function) {
    if (root !== null) {
      this._postOrderTranverse(root.left, cb)
      this._postOrderTranverse(root.right, cb)
      cb && cb(root.key)
    }
  }

  // 层级遍历
  levelOrderTranverse(cb) {
    const queue = []
    queue.push(this.root)
    while (queue.length > 0) {
      const cur: Node = queue.shift()
      if (cur.left) {
        queue.push(cur.left)
      }
      if (cur.right) {
        queue.push(cur.right)
      }
      cb && cb(cur.key)
    }
  }

  // min
  min(): number {
    return this._min(this.root).key
  }

  private _min(node: Node): Node {
    if (node && node.left) {
      return this._min(node.left)
    } else {
      return node
    }
  }

  minLoop(): number {
    let node = this.root
    while (node && node.left) {
      node = node.left
    }
    return node.key
    // const queue = [] 
    // queue.push(this.root) 
    // while (queue.length > 0) {
    //   const cur = queue.pop() 
    //   if (cur.left) {
    //     queue.push(cur.left) 
    //   } else {
    //     return cur.key 
    //   }
    // }
  }

  // max
  max(): number {
    return this._max(this.root).key
  }

  private _max(node: Node): Node {
    if (node && node.right) {
      return this._max(node.right)
    } else {
      return node
    }
  }

  maxLoop(): number {
    const queue = []
    queue.push(this.root)
    while (queue.length > 0) {
      const cur = queue.pop()
      if (cur.right) {
        queue.push(cur.right)
      } else {
        return cur.key
      }
    }
  }

  isContain(key: number): boolean {
    return this._isContain(this.root, key)
  }

  private _isContain(root: Node, key): boolean {
    if (!root) return false
    if (root.key === key) return true
    if (root.key < key) {
      return this._isContain(root.right, key)
    } else {
      return this._isContain(root.left, key)
    }
  }

  remove(key: number) {
    this._remove(this.root, key)
  }

  private _remove(root: Node, key: number) {
    if (root === null) return root
    if (root.key === key) { // find
      // 叶子节点
      if (!root.left && !root.right) {
        root = null
        return root
      } else if (root.left && !root.right) {
        root = root.left
        return root
      } else if (!root.left && root.right) {
        root = root.right
        return root
      } else {
        // 找到右子树最小值
        const minNode = this._min(root.right)
        root.key = minNode.key
        this._remove(root.right, minNode.key)
        return root
      }
    } else if (root.key < key) {
      root.right = this._remove(root.right, key)
      return root
    } else if (root.key > key) {
      root.left = this._remove(root.left, key)
      return root
    }

  }
}

const arr: number[] = [8, 3, 10, 1, 6, 14, 4, 7, 13]
const binaryTree = new BinaryTree()

arr.forEach(i => {
  binaryTree.intert(new Node(i))
})

// binaryTree.levelOrderTranverse((i) => {
//   console.log(i) 
// }) 

binaryTree.remove(3)

binaryTree.levelOrderTranverse((i) => {
  console.log(i)
})

console.log(binaryTree.isContain(5))
