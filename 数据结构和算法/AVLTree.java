import java.util.LinkedList;
import java.util.Queue;

/**
 * 平衡二叉树（AVL）
 */
public class AVLTree<T extends Comparable<T>> {

  // 根节点
  private AVLNode<T> root;

  /**
   * 右旋（LL型）
   * 
   * @param node 不平衡子树根节点节点
   * @return 旋转后的子树
   */
  public AVLNode<T> singleRotateRight(AVLNode<T> node) {
    AVLNode<T> leftNode = node.left;
    node.left = leftNode.right;
    leftNode.right = node;

    // 更新高度
    node.height = Math.max(height(node.left), height(node.right)) + 1;
    leftNode.height = Math.max(height(leftNode.left), node.height) + 1;

    return leftNode;
  }

  /**
   * 右旋（RR型）
   * 
   * @param node
   * @return
   */
  public AVLNode<T> singleRotateLeft(AVLNode<T> node) {
    AVLNode<T> rightNode = node.right;
    node.right = rightNode.left;
    rightNode.left = node;

    // 更新高度
    node.height = Math.max(height(node.left), height(node.right)) + 1;
    rightNode.height = Math.max(height(rightNode.right), node.height) + 1;

    return rightNode;
  }

  /**
   * 左-右旋（LR型）
   * 
   * @param node
   * @return
   */
  public AVLNode<T> doubleRotateLeftRight(AVLNode<T> node) {
    // 先对左子树进行左旋
    node.left = this.singleRotateLeft(node.left);
    // 对不平衡节点进行右旋
    return this.singleRotateRight(node);
  }

  /**
   * 右-左旋（RL型）
   * 
   * @param node
   * @return
   */
  public AVLNode<T> doubleRotateRightLeft(AVLNode<T> node) {
    // 先对其右子树进行右旋
    node.right = this.singleRotateRight(node.right);
    // 对不平衡节点进行左旋
    return this.singleRotateLeft(node);
  }

  public int height() {
    return this.height(this.root);
  }

  public int height(AVLNode<T> node) {
    return node == null ? -1 : node.height;
  }

  public void insert(T data) {
    this.root = this._insert(root, data);
  }

  private AVLNode<T> _insert(AVLNode<T> node, T data) {
    if (node == null) { // 创建新节点
      node = new AVLNode<T>(data);
    }

    // 往左添加
    if (data.compareTo(node.data) < 0) {

      node.left = _insert(node.left, data);

      // 是否失衡
      if (height(node.left) - height(node.right) == 2) {
        // 判断是插入失衡点左孩子的左子树还是右子树
        if (data.compareTo(node.left.data) < 0) {
          // LL型
          node = singleRotateRight(node);
        } else {
          // LR型
          node = doubleRotateLeftRight(node);
        }
      }

      // 往右添加
    } else if (data.compareTo(node.data) > 0) {

      node.right = _insert(node.right, data);

      // 判断是否失衡
      if (height(node.right) - height(node.left) == 2) {
        if (data.compareTo(node.right.data) < 0) {
          // RL型
          node = doubleRotateRightLeft(node);
        } else {
          // RR型
          node = singleRotateLeft(node);
        }
      }
    }

    node.height = Math.max(height(node.left), height(node.right)) + 1;

    return node;
  }

  /**
   * 删除方法
   * 
   * @param data
   */
  public void remove(T data) {
    if (data == null) {
      throw new RuntimeException("data can\'t not be null ");
    }
    this.root = remove(data, root);
  }

  /**
   * 删除操作
   * 
   * @param data
   * @param p
   * @return
   */
  private AVLNode<T> remove(T data, AVLNode<T> p) {

    if (p == null)
      return null;

    int result = data.compareTo(p.data);

    // 从左子树查找需要删除的元素
    if (result < 0) {
      p.left = remove(data, p.left);

      // 检测是否平衡
      if (height(p.right) - height(p.left) == 2) {
        AVLNode<T> currentNode = p.right;
        // 判断需要那种旋转
        if (height(currentNode.right) >= height(currentNode.left)) {
          // RR
          p = singleRotateLeft(p);
        } else {
          // RL
          p = doubleRotateRightLeft(p);
        }
      }

    }
    // 从右子树查找需要删除的元素
    else if (result > 0) {
      p.right = remove(data, p.right);
      // 检测是否平衡
      if (height(p.left) - height(p.right) == 2) {
        AVLNode<T> currentNode = p.left;
        // 判断需要那种旋转
        if (height(currentNode.left) >= height(currentNode.right)) {
          // LL
          p = singleRotateRight(p);
        } else {
          // LR
          p = doubleRotateLeftRight(p);
        }
      }
    }
    // 已找到需要删除的元素,并且要删除的结点拥有两个子节点
    else if (p.right != null && p.left != null) {

      // 寻找替换结点
      p.data = findMin(p.right).data;

      // 移除用于替换的结点
      p.right = remove(p.data, p.right);
    } else {
      // 只有一个孩子结点或者只是叶子结点的情况
      p = (p.left != null) ? p.left : p.right;
    }

    // 更新高度值
    if (p != null)
      p.height = Math.max(height(p.left), height(p.right)) + 1;
    return p;
  }

  public AVLNode<T> findMin(AVLNode<T> node) {
    if (node == null)
      return null;
    if (node.left == null)
      return node;

    return findMin(node.left);
  }

  /**
   * 使用队列进行层级遍历
   */
  public void levelOrderTranverse() {
    Queue<AVLNode<T>> queue = new LinkedList<AVLNode<T>>();

    queue.offer(this.root);

    while (!queue.isEmpty()) {
      AVLNode<T> node = queue.poll();
      if (node.left != null) {
        queue.offer(node.left);
      }
      if (node.right != null) {
        queue.offer(node.right);
      }
      System.out.print(node.data + ", ");
    }
  }

  public static void main(String[] args) {
    AVLTree<Integer> tree = new AVLTree<Integer>();
    int[] arr = new int[] { 50, 45, 60, 30, 46, 47, 55, 70, 80 };
    for (int i = 0; i < arr.length; i++) {
      tree.insert(arr[i]);
    }

    tree.levelOrderTranverse();
    tree.remove(80);
    System.out.println("");
    tree.levelOrderTranverse();
    System.out.println(tree.height());

  }

}

/**
 * 节点对象
 * 
 * @param <T> 节点类型
 */
class AVLNode<T> {
  public AVLNode<T> left;
  public AVLNode<T> right;
  public int height;
  public T data;

  public AVLNode(T data) {
    this.data = data;
  }

  public AVLNode(T data, AVLNode<T> left, AVLNode<T> right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}