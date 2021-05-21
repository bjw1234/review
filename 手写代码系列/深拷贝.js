const deepClone = (obj) => {
  if (Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Object]') {
    const result = Array.isArray(obj) ? [] : {};
    Object.getOwnPropertyNames(obj).map(name => {
      if (typeof obj[name] === 'object' && obj[name] !== null) {
        result[name] = deepClone(obj[name])
      } else {
        result[name] = obj[name]
      }
    })
    return result
  } else if (obj instanceof Date) {
    return new Date(obj)
  } else if (obj instanceof RegExp) {
    return new RegExp(obj)
  } else {
    return obj
  }
}

const obj = {
  name: 'bjw',
  children: [1, 2, 3, 4],
  a: NaN,
  say: () => console.log('32')
}

// console.log(deepClone(obj))


// 使用循环的方式解决
const deepCloneCircle = (obj) => {

  const getEmpty = val => {
    if (Array.isArray(val)) return []
    if (Reflect.toString.call(val) === '[object Object]') {
      return {}
    }
    return val
  }

  const queue = []
  const result = getEmpty(obj)
  if (result === obj) return result

  queue.push([result, obj])
  while (queue.length) {
    const [target, origin] = queue.shift()
    Object.getOwnPropertyNames(origin).map(key => {
      const cur = getEmpty(origin[key])
      if (cur !== origin[key]) { // 对象类型
        queue.push([cur, origin[key]])
      }
      target[key] = cur
    })
  }

  return result
}

console.log(deepCloneCircle(obj))
