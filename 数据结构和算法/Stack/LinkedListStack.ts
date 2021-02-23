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

type func<T> = (value: T) => void

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
    this.root = node
    this.length += 1
  }

  pop() {
    if (this.root.next === null)
      return undefined
    const val = this.root.val
    this.root = this.root.next
    this.length -= 1
    return val
  }

  isEmpty() {
    return this.length === 0
  }

  getSize() {
    return this.length
  }

  forEach(func: func<T>) {
    if (typeof func !== 'function') {
      throw new TypeError('params must is a function.')
    }
    let current = this.root
    for (let i = 0; i < this.getSize(); i++) {
      func(current.val)
      current = current.next
    }
  }
}

const stack = new LinkedListStack<string>()
stack.push('hello0')
stack.push('hello1')
stack.push('hello2')
stack.forEach((value) => {
  console.log("forEach:", value);
})
console.log("getSize:", stack.getSize())
console.log("isEmpty", stack.isEmpty())
console.log("pop", stack.pop())
console.log("pop", stack.pop())
console.log("pop", stack.pop())
console.log("pop", stack.pop())
console.log("getSize", stack.getSize())
