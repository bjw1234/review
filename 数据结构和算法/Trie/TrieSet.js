// Trie前缀树，对于操作字符串有着很高的性能
class TrieNode {
  constructor(isWord = false) {
    this.isWord = isWord
    this.next = new Map()
  }
}

class TrieSet {
  constructor() {
    this.size = 0
    this.root = new TrieNode()
  }

  getSize() {
    return this.size
  }

  add(word) {
    let current = this.root
    for (let i = 0; i < word.length; i++) {
      const c = word.charAt(i)
      if (!current.next.has(c)) {
        current.next.set(c, new TrieNode())
      }
      current = current.next.get(c)
    }
    // 循环完毕后，current指向单词的最后一个字符
    if (!current.isWord) {
      current.isWord = true
      this.size++
    }
  }

  contains(word) {
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

  // 查询是否有单词以prefix为前缀
  isPrefix(prefix) {
    let current = this.root
    for (let i = 0; i < prefix.length; i++) {
      const c = prefix[i]
      if (!current.next.has(c)) {
        return false
      }
      current = current.next.get(c)
    }
    return true
  }

  // 搜索正则表达式是否匹配 [a..e] = [abce]
  searchReg(word) {
    return this.match(this.root, word, 0)
  }

  match(node, word, index) {
    if (index === word.length) return node.isWord

    const c = word[index]
    if (c !== `.`) {
      const cur = node.next.get(c)
      if (!cur) {
        return false
      }
      return this.match(cur, word, index + 1)
    } else { // c 是表示任意字符, 遍历一遍
      for (let [, nextEle] of node.next) {
        if (this.match(nextEle, word, index + 1))
          return true
      }
      return false
    }
  }

}

const set = new TrieSet()
set.add('apple')
set.add('apple')
set.add('panda')
set.add('c')
console.log(set.contains('panda'))
// set.add('pan')
console.log(set.contains('pan'))
console.log(set.getSize())
console.log(set.isPrefix('app'))
console.log('正则', set.searchReg(`app.e`))
