enum promiseState {
  pending, resolved, rejected,
}

export default class MyPromise {

  private state: promiseState
  private value: any
  private resolvedCallbacks: Function[]
  private rejectedCallbacks: Function[]

  constructor(fn: (resolve: Function, reject: Function) => void) {
    this.state = promiseState.pending
    this.value = null
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    const resolve = (value) => {
      if (this.state === promiseState.pending) {
        this.state = promiseState.resolved
        this.value = value
        this.resolvedCallbacks.map(cb => cb(this.value))
      }
    }

    const reject = (value) => {
      if (this.state === promiseState.pending) {
        this.state = promiseState.rejected
        this.value = value
        this.rejectedCallbacks.map(cb => cb(this.value))
      }
    }

    // 执行执行器函数
    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfiled, onRejected) {
    if (this.state === promiseState.pending) {
      this.resolvedCallbacks.push(onFulfiled)
      this.rejectedCallbacks.push(onRejected)
    }
    if (this.state === promiseState.resolved) {
      onFulfiled(this.value)
    }
    if (this.state === promiseState.rejected) {
      onRejected(this.value)
    }
    // 支持链式调用
    return this;
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello')
  }, 2000);
}).then(v => {
  console.log('第一次：', v)
}, v => {
  console.log('rejected', v)
})