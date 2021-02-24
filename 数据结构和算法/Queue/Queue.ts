// 队列 其定义应该如下所示
interface Queue<E> {
  enqueue(E)
  dequeue(): E
  getFront(): E
  getSize(): number
  isEmpty(): boolean
}

// 两个重要的队列结构：
// 双端队列（头部、尾部都可以添加删除元素，兼具队列和栈两种特点）
// 滑动窗口（一个运行在大数组上的子序列，该数组是一个底层元素集合）

// 双端队列的应用：翻转字符串中的单词
// 滑动窗口应用：无重复字符的最长公共子串
