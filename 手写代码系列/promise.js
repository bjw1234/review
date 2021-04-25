const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECT = 'REJECT'

class MyPromise {

  constructor(fn) {
    this.status = PENDING
    this.value = null
    this.reason = null

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value

        this.onFulfilledCallbacks.forEach(cb => cb(value))
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECT
        this.reason = reason

        this.onRejectedCallbacks.forEach(cb => cb(reason))
      }
    }

    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    }
    return new MyPromise((r) => r(value))
  }

  static reject(reason) {
    if (reason instanceof MyPromise) {
      return reason
    }
    return new MyPromise((_, r) => r(reason))
  }

  then(onResove, onReject) {
    // 实现值穿透
    onResove = typeof onResove === 'function' ? onResove : v => v
    onReject = typeof onReject === 'function' ? onReject : e => { throw Error(e) }

    return new MyPromise((resolve, reject) => {

      const handleFulfilled = () => {
        try {
          const resp = onResove(this.value)
          if (resp instanceof MyPromise) {
            return resp.then(resolve, reject)
          }
          return resolve(resp)
        } catch (e) {
          reject(e)
        }
      }

      const handleReject = () => {
        try {
          const resp = onReject(this.reason)
          if (resp instanceof MyPromise) {
            return resp.then(resolve, reject)
          }
          return reject(resp)

        } catch (e) {
          reject(e)
        }
      }

      switch (this.status) {
        case PENDING:
          // notes: 坑的地方
          // 这里并不是直接加入 onResolve、onReject 方法，而是加入封装过后的方法，
          // 这样才能形成链式调用，调用前一个promise的 onResolve 方法 接着根据返回值，
          // 如果为 promise，则通过promise.then 调用下一个promise的 onResolve 方法
          // 否则 直接 调用 下一个函数的 onResolve 方法
          this.onFulfilledCallbacks.push(handleFulfilled)
          this.onRejectedCallbacks.push(handleReject)
          break

        case FULFILLED:
          handleFulfilled()
          break

        case REJECT:
          handleReject()
          break
      }
    });
  }

}


// const p = new MyPromise((resolve, reject) => {
//   console.log('hello 1')
//   setTimeout(() => {
//     resolve(1)
//   }, 1000);
// }).then(res => {
//   console.log(res)
//   return MyPromise.reject(2)
// }).then(res => {
//   console.log(res)
// }, e => {
//   console.log('reject', e)
// })

let promise = MyPromise.resolve();

promise.then(() => console.log("promise done!"));

console.log("code finished"); // 应该这个 console 先显示


// 如果先 resolve，那么promise就会被 fullfilled，在后面调用 then 的时候直接把回调函数送到微任务队列里；
// 而如果在调用 then 的时候还没有 resolve，那么只会把回调函数临时放到某个结构里，只有在后面确实 resolve 之后，
// promise 才会达到 fullfilled 状态，才会从结构中取出这个回调函数放到微任务队列里去执行