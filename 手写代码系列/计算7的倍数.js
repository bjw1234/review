// 不用加减乘数 计算任意数字的7倍数

// 1.利用 7 进制计算
const sevenVal = val => {
  const temp = String(val).toString(7)
  return parseInt(`${temp}0`, 7)
}

console.log(sevenVal(3))

// 利用位运算实现 n << 3 - n 即可
// 任意数的负值：取反后加1 ~n + 1
const sevenVal2 = val => {
  // return add(val << 3, -val)
  // return add(val << 3, ~val + 1)
  return add(val << 3, add(~val, 1))
}

function add(m, n) {
  if (n === 0) return m
  const cm = m ^ n
  const cn = (m & n) << 1
  return add(cm, cn)
}

console.log(sevenVal2(5))
