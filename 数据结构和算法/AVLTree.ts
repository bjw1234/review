/**
 * 使用ts实现AVL
 */
class AVLTree<T> {
  private root: AVLNode<T>

  constructor() {
    this.root = null
  }

  // LL型
  singleRotateRight(node: AVLNode<T>): AVLNode<T> {
    const leftNode = node.left
    node.left = leftNode.right
    leftNode.right = node

    // 更新高度
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1
    leftNode.height = Math.max(this.height(leftNode.left), node.height) + 1
    return leftNode
  }

  // RR型
  singleRotateLeft(node: AVLNode<T>): AVLNode<T> {
    const rightNode = node.right
    node.right = rightNode.left
    rightNode.left = node

    // 更新高度
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1
    rightNode.height = Math.max(this.height(rightNode.right), node.height) + 1
    return rightNode
  }

  // LR型
  doubleRotateLeftRight(node: AVLNode<T>): AVLNode<T> {
    node.left = this.singleRotateLeft(node.left)
    return this.singleRotateRight(node)
  }

  // RL型
  doubleRotateRightLeft(node: AVLNode<T>): AVLNode<T> {
    node.right = this.singleRotateRight(node.right)
    return this.singleRotateLeft(node)
  }

  insert(data: T) {
    this.root = this._insert(this.root, data)
  }

  _insert(node: AVLNode<T>, data: T): AVLNode<T> {
    if (node === null) {
      node = new AVLNode<T>(data)
      return node
    }

    if (data < node.data) {
      node.left = this._insert(node.left, data)
      // 判断是否失衡
      if (this.height(node.left) - this.height(node.right) === 2) {
        if (data < node.left.data) {
          node = this.singleRotateRight(node) // LL
        } else {
          node = this.doubleRotateLeftRight(node) // LR
        }
      }
    } else {
      node.right = this._insert(node.right, data)
      // 判断是否失衡
      if (this.height(node.right) - this.height(node.left) === 2) {
        if (data < node.right.data) {
          node = this.doubleRotateRightLeft(node) // RL
        } else {
          node = this.singleRotateLeft(node) //RR
        }
      }
    }

    // 调整高度
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1

    return node
  }

  heightRoot(): number {
    return this.height(this.root);
  }

  height(node: AVLNode<T>): number {
    return node === null ? -1 : node.height
  }

  remove(data: T) {
    if (!data) return;
    this.root = this._remove(this.root, data)
  }

  _remove(node: AVLNode<T>, data: T): AVLNode<T> {
    if (node === null) return null

    if (data < node.data) {
      node.left = this._remove(node.left, data)
      // 判断是否平衡
      if (this.height(node.right) - this.height(node.left) === 2) {
        const rightNode = node.right
        if (this.height(rightNode.left) <= this.height(rightNode.right)) { // RR
          node = this.singleRotateLeft(node)
        } else { //RL
          node = this.doubleRotateRightLeft(node)
        }
      }

    } else if (data > node.data) {
      node.right = this._remove(node.right, data)
      // 判断是否平衡
      if (this.height(node.left) - this.height(node.right) === 2) {
        const leftNode = node.left
        if (this.height(leftNode.left) >= this.height(leftNode.right)) { // LL
          node = this.singleRotateRight(node)
        } else { // LR
          node = this.doubleRotateLeftRight(node)
        }
      }

    } else { // 找到了被删除节点
      if (node.right !== null && node.left !== null) {
        node.data = this.findMin(node.right).data
        node.right = this._remove(node.right, node.data)
      } else {
        node = (node.left !== null) ? node.left : node.right
      }
    }

    // 更新高度
    if (node !== null) {
      node.height = Math.max(this.height(node.left), this.height(node.right)) + 1
    }
    return node
  }

  findMin(node: AVLNode<T>): AVLNode<T> {
    if (node === null) return null
    if (node.left === null) return node
    return this.findMin(node.left)
  }

  levelOrderTranverse(cb) {
    const queue = []
    queue.push(this.root)
    while (queue.length > 0) {
      const cur: AVLNode<T> = queue.shift()
      if (cur.left) {
        queue.push(cur.left)
      }
      if (cur.right) {
        queue.push(cur.right)
      }
      cb && cb(cur.data)
    }
  }
}


class AVLNode<T> {
  left: AVLNode<T>
  right: AVLNode<T>
  height: number
  data: T

  constructor(data: T) {
    this.data = data
    this.left = null;
    this.right = null;
    this.height = 0;
  }
}


// 测试
const arr = [50, 45, 60, 30, 46, 47, 55, 70, 80, 20, 20, 19]
const tree = new AVLTree<number>()
arr.forEach(item => {
  tree.insert(item)
})
tree.remove(55)
tree.levelOrderTranverse(item => console.log(item))
