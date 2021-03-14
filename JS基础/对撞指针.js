// 在一个有序的数组中，如何找到和为target的两个值？
// 采用对撞指针的思路，从数组两头逐渐往中间逼近，每次判断两数之和与目标值之间的差距，
// 进而确定如何逼近（从左或者从右），直到找到目标值。
// 整个过程只遍历了一遍数组，所以算法复杂度为O(n)。
// 暴力解法O(n2)
// 二分法：cur = target - arr[i] 复杂度：O(nlogn)

function getValue(arr, target) {
  if (!Array.isArray(arr)) return false;
  let l = 0, r = arr.length - 1;
  while (l < r) {
    if (arr[l] + arr[r] === target) return [l, r];
    if (arr[l] + arr[r] > target) r--;
    if (arr[l] + arr[r] < target) l++;
  }
  return false;
}

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

// 如果采用二分法如何解决呢？
function getValueDichotomy(arr, target) {
  if (!Array.isArray(arr)) return false;
  for (let i = 0; i < arr.length; i++) {
    const cur = target - arr[i];
    // 通过二分法查找是否存在改值
    const idx = dichotomy(arr, cur);
    if (idx !== -1) return [i, idx];
  }
  return false;
}


const arr = [2, 4, 6, 7, 8, 9];
console.log('getValue', getValue(arr, 12)); // [1, 4]
console.log('getValue', getValue(arr, 6)); // [0, 1]

console.log('getValueDichotomy', getValueDichotomy(arr, 12)); // [1, 4]
console.log('getValueDichotomy', getValueDichotomy(arr, 6)); // [0, 1]