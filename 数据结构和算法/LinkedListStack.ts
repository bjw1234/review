/**
 * 使用链表实现一个栈
 * 对链表的头元素操作
 * 时间复杂度O(1)
 */
interface IStack<T> {
  push(t: T)
  pop(): T
  isEmpty(): boolean
  getSize(): number
}

class Node<T> {
  val: T
  next: Node<T>

  constructor(val, next) {
    this.val = val
    this.next = next
  }
}

export default class LinkedListStack<T> implements IStack<T> {
  private root: Node<T>
  private length: number

  constructor() {
    this.length = 0
    this.root = new Node<T>(undefined, null)
  }

  push(val: T) {
    const node = new Node<T>(val, this.root)
    node.next = this.root
    this.root = node
    this.length = this.length + 1
  }

  pop() {
    if (this.root.next === null)
      return undefined
    const val = this.root.val
    this.root = this.root.next
    this.length = this.length - 1
    return val
  }

  isEmpty() {
    return this.length === 0
  }

  getSize() {
    return this.length
  }
}

const stack = new LinkedListStack<string>()
stack.push('hello0')
stack.push('hello1')
stack.push('hello2')
console.log(stack.getSize())
console.log(stack.pop())
console.log(stack.getSize())
console.log(stack.pop())
