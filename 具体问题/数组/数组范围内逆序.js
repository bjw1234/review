const arr = [4, 1, 2, 8, 5, 7, 9, 0]

// 以n个元素为一组，进行逆序
function reverse(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    // [i, i+n-1] 区间内元素逆序
    subReverse(arr, i, i + n - 1) // [l, r]
  }
  return arr
}

function subReverse(arr, s, e) {
  while (s < e) {
    const temp = arr[s]
    arr[s++] = arr[e]
    arr[e--] = temp
  }
}

console.log(reverse(arr, 4))