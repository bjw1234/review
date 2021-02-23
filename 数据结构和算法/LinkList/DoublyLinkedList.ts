/**
 * 双链表
 * 优点：对于任意给的节点，都可以很容易获取其前驱结点和后继节点
 * 缺点：每个节点需要添加prev域，因此需要更多空间开销，同时节点的插入与删除也将更加耗时，
 * 因为需要更多的指针指向操作。
 */
export class Node<T>{
  prev: Node<T> // 前驱指针
  next: Node<T> // 后继指针
  val: T

  constructor(val: T, prev = null, next = null) {
    this.next = next
    this.prev = prev
    this.val = val
  }
}

export default class DoublyLinkedList<T>{
  private head: Node<T>
  private tail: Node<T>
  private length: number

  constructor() {
    this.head = new Node<T>(null)
    this.tail = this.head
    this.length = 0
  }

  append(val: T) {
    const node = new Node<T>(val, this.tail, null)
    this.tail.next = node
    this.tail = node
    this.length++
  }

  insert(pos: number, val: T) {
    if (pos < 0 || pos > this.length || val === null) {
      return false
    }
    // 要插入节点位置的前一个节点
    let front = this.head
    while (pos !== 0) {
      front = front.next
      pos--
    }
    const node = new Node<T>(val, front, front.next)

    if (front.next !== null) {
      // 更改被插节点的前继节点
      front.next.prev = node
    }

    // 更改前一个节点的后继节点
    front.next = node

    // 尾部插入
    if (front === this.tail) {
      this.tail = node
    }
    this.length++
    return true
  }

  remove(val: T) {
    for (let front = this.head; front !== null;) {
      const cur = front.next
      if (cur && cur.val === val) { // 删除
        this.length--
        front.next = cur.next
        // 清除当前节点的指针
        cur.next = null
        cur.prev = null
        if (cur.next) {
          cur.next.prev = front
        }
        if (cur === this.tail) {
          this.tail = front
        }
      } else {
        front = front.next
      }
    }
  }

  isContains(val: T): boolean {
    for (let i = this.head; i !== null; i = i.next) {
      if (i.val === val) {
        return true
      }
    }
    return false
  }

  getSize() {
    return this.length
  }

  isEmpty() {
    return this.length === 0
  }

  tailVal() {
    return this.tail.val
  }

  toString() {
    const temp = []
    for (let i = this.head; i !== null; i = i.next) {
      if (i.val === null) {
        temp.push('null')
      } else {
        temp.push(i.val)
      }
    }
    return `双链表：${temp.join(' <=> ')}`
  }

}

const list = new DoublyLinkedList<number>()
const arr = [2, 2, 5, 2, 2, 2]
arr.forEach((item, index) => {
  list.insert(index, item)
})
// list.append(22)
console.log(list.toString(), list.getSize())
console.log(list.isContains(2), list.tailVal())
list.remove(2)
console.log(list.isContains(2), list.tailVal())
console.log(list.toString(), list.getSize())


