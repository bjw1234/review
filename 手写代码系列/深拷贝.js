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
  say: () => console.log('32')
}

console.log(deepClone(obj))