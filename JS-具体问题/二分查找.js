function dichotomy(arr, target) {
  let l = 0, r = arr.length; // [l, r)
  while (l < r) {
    const midIdx = Math.floor((l + r) / 2);
    if (arr[midIdx] === target) return midIdx;
    if (target > arr[midIdx]) {
      l = midIdx + 1;
    } else {
      r = midIdx;
    }
  }
  return -1;
}

const arr = [2, 4, 6, 7, 8, 9];
console.log(dichotomy(arr, 8));