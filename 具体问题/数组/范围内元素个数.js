// 查找【a, b】范围内元素个数
// [3, 2 ,5, 2, 3, 4 ] // [0, 3, 2]  -> 2
//  0  1  2  3  4  5 index下标
// 2: [1, 3]

// 转换为 以当前元素为key，所有以key为值得元素作为value，构成一个升序数组。
function queryBox(arr, condition) {
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (map.has(element)) {
      map.get(element).push(i)
    } else {
      map.set(element, [i])
    }
  }
  // 利用二分查找，在区间 [a, b] 内
  // < a 个数 aNumber
  // < b+1 个数 bNumber
  // return bNumber - aNumber
  // 在一个有序区间内，找到小于某个值得个数
  const box = map.get(condition[2])
  if (!box) return 0

  const aNum = countLessCondition(box, condition[0])
  const bNum = countLessCondition(box, condition[1] + 1)
  return bNum - aNum
}

function countLessCondition(arr, value) {
  let mostRight = -1
  let left = 0, right = arr.length // [l, r)
  while (left < right) {
    const idx = left + (right - left) / 2
    const current = arr[idx]
    if (current < value) {
      mostRight = idx
      left = idx + 1
    } else {
      right = idx
    }
  }

  return mostRight + 1
}

// 测试
const arr = [3, 2, 5, 2, 3, 4]
console.log(queryBox(arr, [0, 2, 2]))
