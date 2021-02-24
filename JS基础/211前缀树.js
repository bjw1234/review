function Node(isWord) {
  this.isWord = isWord || false
  this.next = new Map()
}

/**
 * Initialize your data structure here.
 */
const WordDictionary = function () {
  this.root = new Node()
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let cur = this.root
  for (let i = 0; i < word.length; i++) {
    const c = word[i]
    if (!cur.next.has(c)) {
      cur.next.set(c, new Node())
    }
    cur = cur.next.get(c)
  }
  if (!cur.isWord) {
    cur.isWord = true
  }
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  return this.match(this.root, word, 0)
};

WordDictionary.prototype.match = function (node, word, index) {
  if (index === word.length) {
    return node.isWord
  }
  const curChar = word[index]
  if (curChar !== ".") {
    const nextNode = node.next.get(curChar)
    if (!nextNode) return false
    return this.match(nextNode, word, index + 1)
  } else {
    // 循环所有的节点
    for (let [, nextNode] of node.next) {
      if (this.match(nextNode, word, index + 1)) {
        return true
      }
    }
    return false
  }
}
/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

const obj = new WordDictionary()
console.log(obj)
obj.addWord('apple')
obj.addWord('bcc')
console.log(obj.search('apple')) // true
console.log(obj.search('ap..e')) // true
console.log(obj.search('app')) // false