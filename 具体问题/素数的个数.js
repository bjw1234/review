
// 求解在 num 范围内素数的个数
// 埃筛法 - 利用数组或是满足标记，找出合数，进而降低运算次数
const getValue = (num) => {
  let result = 0
  const map = new Map() // 用于标记合数
  for (let i = 2; i < num; i++) {
    if (!map.has(i)) {
      result++
      // 2*i，3*i，4*i.... ---> i*i作为初始值
      for (let j = 2 * i; j < num; j += i) {
        map.set(j, 0) // 满足条件的都是合数
      }
    }
  }
  return result
}

console.log(getValue(100))
