// abcdef 4 前四个数据和后两个数据交换 -> efabcd

function reverse(str, idx) {
  if (!str) return str
  subReverse(str, 0, idx - 1)
  subReverse(str, idx, str.length)
  subReverse(str, 0, str.length)
  return str
}

function subReverse(arr, s, e) {
  while (s < e) {
    const temp = arr[s]
    arr[s++] = arr[e]
    arr[e--] = temp
  }
}

const str = ['a', 'b', 'c', 'd', 'e', 'f']
console.log(reverse(str, 4).join(''))


  /**
   * f (a, b) 一致随机
   * g (c, d) 求随机值
   * 
   * f(7, 15)
   * g(11, 27)
   */

  // random = (f(a, b) - a) / (b - a) // 0-1
  // random * (d - c) + d // c-d

