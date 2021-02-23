const PENDING = 'pending'
const RESOLVE = 'resolve'
const REJECT = 'reject'

type resolveFn = (data?: any) => void
type rejectFn = (data?: any) => void

type execFn = (resove?: resolveFn, reject?: rejectFn) => void

enum statusEnum {
  PENDING, RESOLVE, REJECT
}

class MyPromise {
  private status: statusEnum
  private data: any // 用户传递的值
  private resolveFnList: resolveFn[]
  private rejectFnList: rejectFn[]

  constructor(fn: execFn) {
    this.rejectFnList = []
    this.resolveFnList = []
    this.status = statusEnum.PENDING

    try {
      fn(this._reslove.bind(this), this._reject.bind(this))
    } catch (e) {
      this._reject(e)
    }
  }

  _reslove(data: any) {
    setTimeout(() => {
      if (this.status === statusEnum.PENDING) {
        this.status = statusEnum.RESOLVE
        this.data = data
        this.resolveFnList.forEach(callback => callback(data))
      }
    });
  }

  _reject(data: any) {
    setTimeout(() => {
      if (this.status === statusEnum.PENDING) {
        this.status = statusEnum.REJECT
        this.data = data
        this.rejectFnList.forEach(callback => callback(data))
      }
    });
  }

  then(resoved?: resolveFn, rejected?: rejectFn) {
    resoved = typeof resoved === 'function' ? resoved : r => r
    rejected = typeof rejected === 'function' ? rejected : e => { throw e }

    if (this.status === statusEnum.PENDING) {
      this.resolveFnList.push(resoved)
      this.rejectFnList.push(rejected)
    }

    if (this.status === statusEnum.RESOLVE) {
      resoved(this.data)
    }

    if (this.status === statusEnum.REJECT) {
      rejected(this.data)
    }

    return this
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello bjw')
  }, 2000);
}).then(res => {
  console.log(res)
}).then(val => {
  console.log(val, 'fdsa')
})
