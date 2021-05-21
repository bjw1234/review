
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
console.log(curLongestCommonPrefix(arrs)) // fl


// 解法 2 使用分制的思想  利用递归去实现

// 求解两个字符串的公共前缀
function prefixTwo(str1: string, str2: string) {
  let j = 0
  for (; j < str1.length && j < str1.length; j++) {
    if (str1.charCodeAt(j) !== str2.charCodeAt(j)) break
  }
  return str1.substring(0, j)
}

function getCommonPrefix(arr: string[]) {
  if (arr.length === 1) return arr[0]
  const mid = Math.floor(arr.length / 2)
  const leftSub = arr.slice(0, mid)
  const rightSub = arr.slice(mid, arr.length)
  return prefixTwo(getCommonPrefix(leftSub), getCommonPrefix(rightSub))
}

console.log(getCommonPrefix(arrs)) // fl
