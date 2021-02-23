class TrieEle {
  isWord: boolean
  next: Map<String, TrieEle>

  constructor(isWord = false) {
    this.isWord = isWord
    this.next = new Map()
  }
}

class TrieSet {
  private root: TrieEle
  private size: number

  constructor() {
    this.size = 0
    this.root = new TrieEle()
  }

  getSize() {
    return this.size
  }

  add(word: string) {
    let current = this.root
    for (let i = 0; i < word.length; i++) {
      const c = word.charAt(i)
      if (!current.next.has(c)) {
        current.next.set(c, new TrieEle())
      }
      current = current.next.get(c)
    }
    // 循环完毕后，current指向单词的最后一个字符
    if (!current.isWord) {
      current.isWord = true
      this.size++
    }
  }

  contains(word: string) {
    let current = this.root
    for (let i = 0; i < word.length; i++) {
      const c = word.charAt(i)
      if (!current.next.has(c)) {
        return false
      }
      current = current.next.get(c)
    }

    return current.isWord
  }

}

const set = new TrieSet()
set.add('apple')
set.add('apple')
set.add('panda')
console.log(set.contains('panda'))
// set.add('pan')
console.log(set.contains('pan'))
console.log(set.getSize())
