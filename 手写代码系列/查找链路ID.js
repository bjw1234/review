const arr = [
  {
    id: '1',
    name: '广东省',
    children: [
      {
        id: '11',
        name: '深圳市',
        children: [
          {
            id: '111',
            name: '福田区',
          },
          {
            id: '112',
            name: '南山区'
          },
        ]
      }
    ]
  }
]


function fn(val) {
  const result = []

  const subFunc = arr => {
    if (!arr) return false
    for (let i = 0; i < arr.length; i++) {
      const { id, name, children } = arr[i]
      if (id === val) {
        result.unshift(`${id}-${name}`)
        return true
      }
      const isExist = subFunc(children)
      if (isExist) {
        result.unshift(`${id}-${name}`)
        return isExist
      }
    }
    return false
  }

  subFunc(arr)
  return result
}



const value = '112'

console.log(fn(value)) // [1, 11, 112]
