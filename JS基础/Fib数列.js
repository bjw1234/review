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

console.log("Fib loop", FibLoop(14));