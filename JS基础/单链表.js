function List() {
  // 节点
  let Node = function (element) {
    this.element = element
    this.next = null
  }
  // 初始头节点为 null
  let head = null

  // 链表长度
  let length = 0
  // 操作

  this.getList = function () { return head }

  this.search = function (element) {
    if (!head) return false
    let p = head
    while (p) {
      if (p.element === element) return true
      p = p.next
    }
    return false
  }

  this.append = function (element) {
    let node = new Node(element)
    let p = head
    if (!head) {
      head = node
    } else {
      while (p.next) {
        p = p.next
      }
      p.next = node
    }
    length += 1
  }

  this.insert = function (position, element) {
    const node = new Node(element)
    if (position < 0 || position > length) return null
    if (position === 0) {
      node.next = head
      head = node
    }

    let prevNode = head
    for (let i = 0; i < position - 1; i++) {
      prevNode = prevNode.next
    }

    node.next = prevNode.next
    prevNode.next = node
    length += 1
  }

  this.remove = function (element) {
    if (!length) return false
    // 判断是否为头结点
    if (element === head.element) {
      head = head.next
      length -= 1
      return true
    }

    let prev = head
    while (prev) {
      const cur = prev.next
      if (cur && cur.element === element) {
        prev.next = cur.next
        length -= 1
        return true
      }
      prev = prev.next
    }
    return false
  }

  this.isEmpty = function () {
    return length === 0
  }

  this.size = function () {
    return length
  }

  this.toString = function () {
    const ret = []
    let p = head
    for (let i = 0; i < length; i++) {
      ret.push(p.element)
      p = p.next
    }
    console.log(ret.join(' -> '))
  }
}

let list = new List()
for (let i = 0; i < 5; i += 1) {
  list.append(i)
}

list.insert(5, 9)
console.log(list.toString())
list.remove(0)
console.log(list.toString())
console.log('size:', list.size())

console.log(list.search(5))
