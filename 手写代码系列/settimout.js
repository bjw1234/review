function mySetTimeout(fn, duration, ...args) {
  let target = Date.now() + duration
  let timer = null
  const loop = () => {
    const now = Date.now()
    if (now > target) {
      fn.apply(null, args)
      if (timer) {
        cancelAnimationFrame(timer)
      }
    } else {
      timer = requestAnimationFrame(loop)
    }
  }
  timer = requestAnimationFrame(loop)
}