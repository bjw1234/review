function co(func) {
  return function (...args) {
    const gen = func.apply(this, args)
    return new Promise((resolve, reject) => {

      function step(type, val) {
        let result
        try {
          result = gen[type](val)
        } catch (e) {
          reject(e)
        }
        const { done, value } = result
        if (done) {
          resolve(value)
        } else {
          return Promise.resolve(value).then(
            val => step('next', val),
            err => step('throw', err)
          )
        }
      }

      step('next')
    })
  }
}

function* hello() {
  yield 2;
  console.log(2);
  yield 3;
  console.log(3);
}

const func = co(hello)

func()

function then(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : v => { throw r }
  return new Promise((resolve, reject) => {
    const handleFulfilled = () => {
      try {
        const ret = onFulfilled(this.value)
        if (ret instanceof Promise) {
          return ret.then(resolve, reject)
        }
        return resolve(this.value)
      } catch {
        reject(this.reason)
      }
    }

    switch (this.status) {
      case PENDING:
        break
      case FULFILLED:
        handleFulfilled()
        break
      case REJECTED:
        break
    }
  })
}