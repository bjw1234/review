function sum(a, b) {
  if (a === 0) return b;
  if (b === 0) return a;
  const newA = a ^ b;
  const newB = (a & b) << 1;

  return sum(newA, newB);
}

console.log(sum(10, 12));
