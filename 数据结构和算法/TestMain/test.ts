const watch = (obj: Object, onChange: Function) => {
  const handler: ProxyHandler<any> = {
    get(target, property, receiver) {
      try {
        return new Proxy(target[property], handler)
      } catch (err) {
        return Reflect.get(target, property, receiver)
      }
    },
    defineProperty(target, property, descriptor) {
      onChange('defineProperty', property)
      return Reflect.defineProperty(target, property, descriptor)
    },
    deleteProperty(target, property) {
      onChange('deleteProperty', property)
      return Reflect.deleteProperty(target, property)
    }
  }
  return new Proxy(obj, handler)
}

const obj = {
  name: 'bjw',
  age: 22,
  child: [1, 2, 3]
}

const p = watch(obj, (type, property) => console.log(`类型：${type}, 属性：${property}`))

p.name = 'qwe'

console.log(p.child)
