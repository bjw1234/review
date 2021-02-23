/**
 * 单链表增删改查
 */
export class Node<T> {
  val: T
  next: Node<T>
  constructor(val: T, next?: Node<T>) {
    this.val = val
    this.next = next || null
  }
}

export default class SingleLinkedList<T> {
  private root: Node<T>
  private length: number

  constructor() {
    this.root = null
    this.length = 0
  }

  getRoot() {
    return this.root
  }

  append(val: T) {
    const node = new Node<T>(val)
    if (!this.root) {
      this.root = node
    } else {
      let p = this.root
      while (p.next !== null) {
        p = p.next
      }
      p.next = node
    }
    this.length += 1
  }

  isContains(val: T): boolean {
    if (!this.root) {
      return false
    }
    for (let p = this.root; p !== null; p = p.next) {
      if (p.val === val) {
        return true
      }
    }
    return false
  }

  insert(pos: number, val: T): boolean {
    if (pos < 0 || pos > this.length || val === null) {
      return false
    }
    // 如果不存在或者是末尾添加
    if (!this.root || pos === this.length) {
      this.append(val)
      return true
    }
    // 开头添加
    if (pos === 0) {
      const node = new Node<T>(val)
      node.next = this.root
      this.root = node
      this.length += 1
      return true
    }
    // 遍历位置添加
    let p = new Node<T>(undefined, this.root)
    while (pos !== 0) {
      p = p.next
      pos--
    }
    const cur = new Node<T>(val, p.next)
    // cur.next = p.next
    p.next = cur
    this.length += 1
    return true
  }

  // 删除指定元素
  remove(val: T) {
    if (!this.root) return
    let p = this.root, prev = this.root
    while (p) {
      if (p.val === val) {
        p = p.next
        prev.next = p
        this.length--
      } else {
        prev = p
        p = p.next
      }
    }
    if (this.isEmpty()) {
      this.root = null
    }
  }

  getSize() {
    return this.length
  }

  isEmpty() {
    return this.length === 0
  }

  toString() {
    const temp = []
    for (let p = this.root; p !== null; p = p.next) {
      temp.push(p.val)
    }
    return `单链表: ${temp.length === 0 ? 'null' : temp.join(' -> ')}`
  }
}


const list = new SingleLinkedList<number>()
const arr = [4, 4]
arr.forEach(i => {
  list.append(i)
})

console.log(list.toString(), list.getSize())
// console.log(list.isContains(4))
// console.log(list.isContains(1))
// console.log(list.isContains(8))
list.insert(0, 100)
list.insert(3, 200)
list.insert(6, 300)
// list.insert(10, 4)
// console.log(list.toString())
list.remove(4)
console.log(list.toString(), list.getSize())
list.append(4)
console.log(list.toString(), list.getSize())