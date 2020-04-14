/**
 * 对一个字符串进行全排列
 * @param str 字符串
 */
const permutate = function (str) {
  if (!str) return null
  if (str.length === 1) return [str]

  const cur = str[0]
  const rest = permutate(str.slice(1))

  const result = []
  for (let i = 0; i < rest.length; i++) {
    const restItem = rest[i]
    for (let j = 0; j <= restItem.length; j++) {
      result.push(
        `${restItem.slice(0, j)}${cur}${restItem.slice(j, restItem.length)}`
      )
    }
  }
  return result
}

// console.log(permutate('abcd'))


const arr = [1, 2, 5, 9, 9, 9, 9, 10]

function searchRight(arr, target) {
  if (!arr || arr.length === 0) return -1
  let left = 0
  let right = arr.length - 1

  while (left < right) {
    let middle = Math.floor((left + right + 1) / 2)
    if (arr[middle] <= target) { // 右
      left = middle
    } else { // 左
      right = middle - 1
    }
  }

  if (arr[left] === target)
    return left
  return -1
}

function searchRight2(arr, target) {
  if (!arr || !arr.length) return -1
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    let middle = Math.floor((left + right) / 2)
    if (arr[middle] <= target) { // 右
      left = middle + 1
    } else { // 左
      right = middle - 1
    }
  }

  if (right === arr.length - 1 && arr[right] !== target)
    return -1

  return right
}

console.log(searchRight2(arr, 11)) // -1
console.log(searchRight2(arr, 10)) // 7
console.log(searchRight2(arr, 9)) // 6




function search(arr, target) {
  if (!arr || !arr.length) return -1;
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    let middle = Math.floor((left + right) / 2)
    if (arr[middle] === target) return middle
    if (arr[middle] < target) { // 右
      left = middle + 1
    } else { // 左
      right = middle - 1
    }
  }
  return -1
}