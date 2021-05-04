class EventEmitter {
  static VERSION = 'v1.0.0'

  constructor() {
    this._events = {}
  }

  on(key, target) {
    this._base(key, target, false)
  }

  once(key, target) {
    this._base(key, target, true)
  }

  _base(key, target, flag = false) {
    const events = this._events
    events[key] = events[key] || []

    if (typeof target === 'function') {
      events[key].push({ listener: target, once: flag })
    } else if (
      Object.prototype.toString.call(target) === '[object Object]' &&
      typeof target.listener === 'function'
    ) {
      events[key].push({ ...target, once: flag })
    } else {
      throw new Error('is not a valid listener.')
    }
  }

  emit(key, ...args) {
    const events = this._events
    const listeners = events[key]
    if (!Array.isArray(listeners)) {
      return
    }
    listeners.forEach((lis, idx) => {
      if (!lis) return
      lis.listener.apply(null, args)
      if (lis.once) {
        listeners.splice(idx, 1, null)
      }
    })

  }

}

// 测试
const em = new EventEmitter()
em.on('say', (...args) => {
  console.log('say1, ', args)
})

em.on('say', (...args) => {
  console.log('say2, ', args)
})

em.once('say', (...args) => {
  console.log('say3, ', args)
})

em.emit('say', 'hello', 'world')

em.emit('say', 'hello2', 'world2')