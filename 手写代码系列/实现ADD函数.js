function add(...args) {

  const fn = (...args2) => {
    args.push(...args2)
    return fn
  }

  fn.valueOf = function () {
    return args.reduce((acc, cur) => acc + cur)
  }

  fn.toString = function () {
    return args.reduce((acc, cur) => acc + cur)
  }

  return fn
}



console.log(add(1)) // 1
add(1)(2) // 3
add(1)(2)(3) // 6
add(1)(2, 3) // 6
add(1, 2)(3) // 6
add(1, 2, 3) // 6