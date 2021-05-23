const bs = x => {
  let index = -1, l = 0, r = x
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2)
    if (mid * mid <= x) {
      index = mid
      l = mid + 1
    } else {
      r = mid - 1
    }
  }
  return index
}

console.log(bs(26)) // 5
