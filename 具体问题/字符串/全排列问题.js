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

console.log(permutate('abcd'))
