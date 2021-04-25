// 其实质就是：实现一个generator的执行器

function asyncToGenerator(genFun) {
  return function () {
    const gen = genFun.apply(this, arguments)
    return new Promise((resolve, reject) => {

      function step(key, arg) {
        let genResult
        try {
          genResult = gen[key](arg)
        } catch (error) {
          return reject(error)
        }
        const { value, done } = genResult
        if (done) {
          return resolve(value)
        } else {
          // value 是一个promise，根据执行结果选择 next 还是 throw
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

// test

const getDataOk = () => new Promise(resolve => setTimeout(() => resolve("data ok"), 1000))
const getDataErr = () => new Promise((r, reject) => setTimeout(() => reject("data err"), 1000))

const test = asyncToGenerator(
  function* testG() {
    const data = yield getDataOk()
    console.log('data: ', data)
    const data2 = yield getDataOk()
    console.log('data2: ', data2)
    return 'success'
  }
)

test().then(v => console.log(v))
  .catch(e => console.log(e))


// 手动执行
const gen = testG()
const p = gen.next()
p.value.then(() => {
  const p2 = gen.next('one')
  p2.value.then(res => {
    const p3 = gen.next('two')
    console.log(p3) // { value: 'success', done: true }
  })
})

