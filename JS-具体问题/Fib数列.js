// 当前值，数列第一二项
function Fib(n, n1, n2) {
  if (n === 0) return n1;
  return Fib(n - 1, n2, n1 + n2);
}

console.log("Fib recu", Fib(14, 0, 1));

function FibLoop(n) {
  let next = 0, n1 = 0, n2 = 1;
  while (n > 0) {
    next = n1 + n2;
    n1 = n2;
    n2 = next;
    n--;
  }
  return n1;
}

console.log("Fib loop", FibLoop(8));

// 记忆化搜索实现fib数列求解
const map = new Map()
function FibCatche(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  if (!map.has(n)) {
    const ret = FibCatche(n - 1) + FibCatche(n - 2)
    map.set(n, ret)
    return ret
  }
  return map.get(n)
}

console.log("fibCatche", FibCatche(40))

// 利用动态规划的思想实现fib
// 自下而上计算
function fib(n) {
  const map = new Map()
  map.set(0, 0)
  map.set(1, 1)
  for (let i = 2; i <= n; i++) {
    map.set(i, map.get(i - 1) + map.get(i - 2))
  }
  return map[n]
}

console.log("fib动态规划", FibCatche(40))
