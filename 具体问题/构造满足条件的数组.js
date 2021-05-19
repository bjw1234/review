// i < k < j 满足 [i] + [j] !== 2*[k]

function makeNo(size) {
  if (size === 1) return [1]

  // [n个奇数] [m个偶数]
  // 7 = 4  3
  const halfSize = Math.ceil(size / 2) // 向上取整
  const base = makeNo(halfSize) // 利用对应位置求解

  const result = []
  let idx = 0
  for (; idx < halfSize; idx++) {
    result[idx] = base[idx] * 2 + 1
  }

  for (let i = 0; idx < size; idx++, i++) {
    result[idx] = base[i] * 2
  }

  return result
}