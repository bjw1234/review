interface IStack<T> {
  push(t: T)
  pop()
  isEmpty(): boolean
  getSize(): number
}

export default class Stack<T> implements IStack<T> {
  private data: T[]

  constructor() {
    this.data = new Array<T>()
  }

  push(t: T) {
    const tempData = this.data
    this.data = [...tempData, t]
  }

  pop() {
    if (this.isEmpty())
      return undefined
    const len = this.data.length
    const val = this.data[len - 1]
    this.data.length = len - 1
    return val
  }

  isEmpty(): boolean {
    return this.data.length === 0
  }

  getSize() {
    return this.data.length
  }

  forEach(func) {
    if (typeof func !== 'function') {
      throw new TypeError('params must is a function.')
    }
    for (let i = 0; i < this.getSize(); i++) {
      const value = this.data[i]
      func(value, i, this.data)
    }
  }

  toString() {
    return JSON.stringify(this.data);
  }
}

const stack = new Stack<string>()

stack.push('hello0')
stack.push('hello1')
stack.push('hello2')
stack.forEach((cur, index, data) => {
  console.log(cur, index, data)
})
console.log("toString:", stack.toString());
console.log("getSize:", stack.getSize())
console.log("isEmpty", stack.isEmpty())
console.log("pop", stack.pop())
console.log("getSize", stack.getSize())