// 创建型
// 结构型
// 行为型

// 单例模式
const getSingle = function (func) {
  let result = null
  return function (...args) {
    if (!result) {
      result = func.apply(this, ...args)
      return result
    }
    return result
  }
}

// 发布订阅模式
function assginEvent(obj = {}) {
  const event = {
    clientList: {},
    listen(key, fn) {
      if (!this.clientList[key]) {
        this.clientList[key] = []
      }
      const arr = this.clientList[key]
      const len = arr.length
      arr[len] = fn
      return () => {
        arr.splice(len, 1)
      }
    },
    trigger(key, ...args) {
      if (!this.clientList[key]) return
      const target = this.clientList[key]
      target.forEach(fn => {
        fn.apply(this, args)
      })
    }
  }
  return Object.assign(event, obj)
}

const salesOffices = assginEvent()
const un = salesOffices.listen('squareMeter88', function (price) { // 小明订阅消息
  console.log(`小明订阅：价格 = ${price}`);
});
const un1 = salesOffices.listen('squareMeter88', function (price) { // 小明订阅消息
  console.log(`小汪订阅：价格 = ${price}`);
});
salesOffices.listen('squareMeter100', function (price) { // 小红订阅消息
  console.log(`小红订阅：价格 = ${price}`);
});
un1()
salesOffices.trigger('squareMeter88', 2000000); // 输出：2000000
salesOffices.trigger('squareMeter100', 3000000); // 输出：3000000


// 策略模式
const strategies = {
  "Air": function () {
    console.log("乘坐飞机！");
  },
  "Train": function () {
    console.log("乘坐火车！");
  },
  "Walk": function () {
    console.log("步行！");
  }
}

// 上下文对象
const strategyContext = function (type) {
  return strategies[type]();
}

// 调用具体的策略
strategyContext("Walk");


// 代理模式
// 保护代理、虚拟代理

// 假如我们有一个 myImage对象，其有 setSrc 方法
// const myImage = { setSrc: () => { /***/ } }

// const proxyImage = (function () {
//   let img = new Image()
//   img.onload = () => {
//     myImage.setSrc(img.src)
//   }
//   return {
//     setSrc(src) {
//       myImage.setSrc('loading.gif')
//       img.src = src
//     }
//   }
// })()

// 职责链模式
// 在JS中一般使用AOP实现职责链
// Aspect Oriented Programming 面向切面编程
const fn1 = (price) => {
  if (price > 0 && price <= 100) {
    console.log('fn1 处理')
  } else {
    return 'next'
  }
}

const fn2 = (price) => {
  if (price > 100 && price <= 200) {
    console.log('fn2 处理')
  } else {
    return 'next'
  }
}

const fn3 = (price) => {
  if (price > 200 && price <= 300) {
    console.log('fn3 处理')
  } else {
    return 'next'
  }
}

Function.prototype.after = function (nextFn) {
  const contextFn = this
  return function (...args) {
    const ret = contextFn(...args)
    if (ret === 'next') {
      return nextFn(...args)
    }
    return ret
  }
}

const exec = fn1.after(fn2).after(fn3)
exec(150)

