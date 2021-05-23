// 利用了reduce初始值为第一个参数值这个特性

// 多个数组求交集
const getIntersection = (arrs) => {
  // 优化，可以将第一个数组转化成 Map，这样判断是否存在就是 O(1)的复杂度
  // 还需要做去重处理
  return arrs.reduce((total, arr) => {
    return arr.filter(item => total.includes(item))
  })
}

// 优化后的版本
const getIntersection2 = (arrs) => {
  if (!arrs.length) return arrs
  if (arrs.length === 1) return arrs[0]

  const mode = arrs[0]
  const modeMap = new Map()
  mode.forEach(m => modeMap.set(m, true))

  return Array.from(new Set(
    arrs.reduce((total, arr) => {
      const item = arr.filter(item => modeMap.has(item))
      return [...total, ...item]
    }, [])
  ))
}


// 测试
const arrs = [[1, 3, 5, 8, 2], [3, 6, 7, 1, 2], [4, 3, 2]]
console.log(getIntersection(arrs)) // [3, 2]
