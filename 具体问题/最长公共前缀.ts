
class TNode {
  isWord: boolean
  next: Map<string, TNode>

  constructor(isWord = false) {
    this.isWord = isWord
    this.next = new Map()
  }
}

class TrieTee {
  head: TNode

  constructor() {
    this.head = new TNode()
  }

  add(word) {
    let cur = this.head
    for (let i = 0; i < word.length; i++) {
      const element = word[i]
      if (!cur.next.has(element)) {
        cur.next.set(element, new TNode())
      }
      cur = cur.next.get(element)
    }
    cur.isWord = true
  }
}

function curLongestCommonPrefix(strs: string[]) {
  const tree = new TrieTee()
  strs.forEach(str => tree.add(str))

  // 计算公共前缀
  let cur = tree.head
  let result = ''
  while (cur) {
    if (cur.next.size > 1) break
    const ele = cur.next.keys().next().value
    result += ele
    cur = cur.next.get(ele)
  }

  return result
}

const arrs = ["flower", "flow", "flight"]
console.log(curLongestCommonPrefix(arrs))
