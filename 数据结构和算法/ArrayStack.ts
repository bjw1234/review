interface IStack<T> {
  push(t: T)
  pop()
  isEmpty(): boolean
  getSize(): number
}

export default class Stack<T> implements IStack<T> {
  private data: T[]

  constructor(capacity = 10) {
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
}

const stack = new Stack<string>()
stack.push('hello0')
stack.push('hello1')
stack.push('hello2')
console.log(stack.getSize())
console.log(stack.isEmpty())
console.log(stack.pop())
console.log(stack.getSize())