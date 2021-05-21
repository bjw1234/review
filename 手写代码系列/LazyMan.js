/**
 * 实现以下函数调用
 * 
 * LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(2).sleep(4).eat('junk food')
 * 
 * Hi I am Tony
 * 等待了5秒...
 * I am eating lunch
 * I am eating dinner
 * 等待了10秒...
 * I am eating junk food 
 */

class LayManCls {
  constructor(name) {
    this.queue = []
    this.name = name
    setTimeout(() => {
      this.start()
    }, 0);
  }

  start() {
    console.log(`Hi I am ${this.name}`)
    let promise = Promise.resolve()
    while (this.queue.length) {
      const func = this.queue.shift()
      promise = promise.then(() => new Promise(func))
    }
  }

  eat(food) {
    this.queue.push(r => {
      console.log(`I am eating ${food}`)
      r()
    })
    return this
  }

  sleep(timeout) {
    this.queue.push(r => {
      setTimeout(() => {
        console.log(`等待了${timeout}秒...`)
        r()
      }, timeout * 1000);
    })
    return this
  }

  sleepFirst(timeout) {
    this.queue.unshift(r => {
      setTimeout(() => {
        console.log(`等待了${timeout}秒...`)
        r()
      }, timeout * 1000);
    })
    return this
  }
}

const LazyMan = (name) => {
  return new LayManCls(name)
}

// 测试
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(2).sleep(4).eat('junk food')
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food 
