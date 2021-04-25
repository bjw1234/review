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

const arr = [2, 4, 6, 7, 8, 8, 8, 8, 8, 9];
console.log(dichotomy(arr, 8)); // 5

// 找最先最先出现的那个元素
function findIndex(arr, target) {
  let l = 0, r = arr.length - 1 // [l, r]
  let ret = -1
  while (l <= r) {
    const midIdx = Math.floor((l + (r - l) / 2));
    if (target <= arr[midIdx]) {
      if (target === arr[midIdx]) {
        ret = midIdx
      }
      r = midIdx - 1
    } else {
      l = midIdx + 1
    }
  }
  return ret
}

console.log(findIndex(arr, 8)); // 4