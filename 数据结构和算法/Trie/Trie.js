// 前缀树
class TrieNode {
  constructor() {
    this.path = 0 // 字符经过节点的次数
    this.end = 0 // 该节点字符串个数
    this.next = new Array(26).fill(null)
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode()
  }

  insert(str) {
    if (!str) return
    let node = this.root
    for (let i = 0; i < str.length; i++) {
      const index = str[i].charCodeAt() - 'a'.charCodeAt()
      if (!node.next[index]) {
        node.next[index] = new TrieNode()
      }
      node.path += 1
      node = node.next[index]
    }
    node.end += 1
  }

  search(str) {
    if (!str) return
    let node = this.root
    for (let i = 0; i < str.length; i++) {
      const index = str[i].charCodeAt() - 'a'.charCodeAt()
      if (!node.next[index]) return 0
      node = node.next[index]
    }
    return node.end
  }

  delete(str) {
    if (!this.search(str)) return
    let node = this.root
    for (let i = 0; i < str.length; i++) {
      const index = str[i].charCodeAt() - 'a'.charCodeAt()
      if (--node.next[index].path === 0) {
        node.next[index] = null
        return
      }
      node = node.next[index]
    }
    node.end -= 1
  }

}

const trie = new Trie()
trie.insert('tea')
trie.insert('tea')
trie.insert('temp')
trie.insert('hello')

console.log(trie.search('tea'))
console.log(trie.search('temp'))
