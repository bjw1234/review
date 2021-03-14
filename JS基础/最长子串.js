// 使用滑动窗口的思想解决
// 算法复杂度 O(n2)
const lengthOfLongestSubstring = function (s) {
  const arr = []
  let max = 0
  for (let i = 0; i < s.length; i++) {
    const idx = arr.indexOf(s[i])
    if (idx !== -1) {
      arr.splice(0, idx + 1)
    }
    arr.push(s[i])
    max = Math.max(max, arr.length)
  }
  console.log('lengthOfLongestSubstring', s, max)
  return max
}

lengthOfLongestSubstring('aaa') // 1
lengthOfLongestSubstring('abcacde') // 4
lengthOfLongestSubstring('ababc') // 3
console.log('\n')

// 滑动 窗口优化，使用数据结构 set
const lengthOfLongestSubstring2 = (s) => {
  let max = 0, i = 0
  const arr = []
  while (i < s.length) {
    if (arr.indexOf(s[i]) === -1) {
      arr.push(s[i])
    } else {
      arr.shift()
      continue // 必须的，先删除重复的元素
    }
    max = Math.max(max, arr.length)
    i++
  }
  console.log('lengthOfLongestSubstring2', s, max)
  return max
}

lengthOfLongestSubstring2('aaa') // 1
lengthOfLongestSubstring2('abcacde') // 4
lengthOfLongestSubstring2('ababc') // 3
console.log('\n')

// i 当前下标 flag 最长子串的开始位置 max 最长的长度
const lengthOfLongestSubstring3 = (s) => {
  let max = 0, j = 0 // 无重复子串开始下标 的下一个位置
  const map = new Map()
  const len = s.length
  for (let i = 0; i < len; i++) {
    if (map.has(s[i])) {
      // 如果有重复元素，要以较大的那个下标作为起始位置
      j = Math.max(map.get(s[i]) + 1, j)
    }
    max = Math.max(max, i - j + 1)
    map.set(s[i], i)
  }

  console.log('lengthOfLongestSubstring3', s, max)
  return max
}


lengthOfLongestSubstring3('aaa') // 1
lengthOfLongestSubstring3('abcacde') // 4
lengthOfLongestSubstring3('ababc') // 3