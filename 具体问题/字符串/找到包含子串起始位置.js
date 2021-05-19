// 给定一个目标字符串：aim = abac
// 当前字符串：akcabbaabca
// 找到这个子串的起始位置，顺序相同包含即可，顺序无所谓 -> aabc
// 同源异构词 - 1.排序然后比较是否相同  2.统计词频，进行减操作

function subStrIdx(str, aim) {
  if (!aim) return -1
  const len = aim.length

  // let curAim = aim.split('').sort().join()

  // // 判断是否同源异构词
  // const isEqu = (s, e) => { // [s, e)
  //   let curStr = str.slice(s, e)
  //   curStr = curStr.split('').sort().join()
  //   console.log(curStr, curAim)
  //   return curStr === curAim
  // }


  const isEqu = (s, e) => {
    if (len !== (e - s)) return false

    let aimMap = new Map()
    for (let i = 0; i < aim.length; i++) {
      const element = aim[i];
      if (aimMap.has(element)) {
        aimMap.set(element, aimMap.get(element) + 1)
      } else {
        aimMap.set(element, 1)
      }
    }

    for (let i = s; i < e; i++) {
      if (!aimMap.has(str[i])) return false
      if (aimMap.get(str[i]) === 0) return false
      const v = aimMap.get(str[i]) - 1
      aimMap.set(str[i], v)
    }

    return true
  }


  for (let i = 0; i < (str.length - len); i++) {
    if (isEqu(i, i + len)) return i
  }
  return -1
}

console.log(subStrIdx('akcabbaabca', 'abca'))