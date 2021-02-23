class mNode<T> {
  value: T
  next: mNode<T>

  constructor(v, next) {
    this.value = v
    this.next = next
  }
}

class LinkList<T> {
  private size: number
  private dummyNode: mNode<T>

  constructor() {
    this.size = 0
    this.dummyNode = new mNode<T>(null, null)
  }

  getSize() {
    return this.size
  }

  isEmpty() {
    return this.size === 0
  }

  checkInex(i) {
    if (i < 0 || i > this.size) throw Error('Index Error')
  }

  // 找到第 Index 位置上的节点 实质上为前一个节点
  find(header: mNode<T>, index: number, cIdx: number): mNode<T> {
    if (index === cIdx) return header
    return this.find(header.next, index, cIdx + 1)
  }

  addNode(v, index) {
    this.checkInex(index)
    const prev = this.find(this.dummyNode, index, 0)
    prev.next = new mNode(v, prev.next)
    this.size++
  }

  insertNode(v, index) {
    this.addNode(v, index)
  }

  addToFirst(v) {
    this.addNode(v, 0)
  }

  addToLast(v) {
    // 因为有虚拟头节点，所以用this.size
    this.addNode(v, this.size)
  }

  // 删除第index位置上的节点
  removeNodeByIndex(index) {
    this.checkInex(index)
    const prev = this.find(this.dummyNode, index, 0)
    const target = prev.next
    prev.next = target.next
    this.size--
  }

  removeFitst() {
    this.removeNodeByIndex(0);
  }

  removeLast() {
    this.removeNodeByIndex(this.size - 1)
  }

  toString() {
    if (this.isEmpty()) return
    let current = this.dummyNode.next
    const ret = []
    while (current) {
      ret.push(current.value)
      current = current.next
    }
    console.log(ret.join(' -> '));
  }
}

const list = new LinkList<number>()
list.addToLast(3)
list.addToLast(5)
list.addToLast(7)
// list.addNode(4, 1)
// list.removeNodeByIndex(2) // index = 2
// list.removeFitst()
// list.removeLast()
console.log(list.toString())
