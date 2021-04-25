// 一组物品，每种物品都有自己的重量和价格。
// 在限定的总重量内，如何选择才能使得物品的总价格最高。
// 物品重量 w(i)，价值 v(i)

// 约束条件 F(n ,C) 考虑将n个物品放进容量为C的背包，使得价值最大

// 状态的定义：考虑将n个物品放进容量为C的背包，使得价值最大

// 状态转移方程：F(i, c) 放入第i个物品，价值最大
// 两种选择
// 1.不放进去：F(i-1, c)
// 2.放进去：v(i) + F(i-1, c - w(i))
// 取得1、2的最大值

// 记录重复子问题的结果值
const memo = {}

// w重量 v价格 C容量
function knapsack(w, v, C) {
  const n = w.length
  // 考虑放入第n-1个元素，使其价值最大
  return bestValue(w, v, n - 1, C)
}

// [0..idx]的物品，填充容积为c的背包的最大价值
function bestValue(w, v, idx, c) {
  if (idx < 0 || c <= 0) return 0
  if (memo[`${idx}-${c}`]) {
    return memo[idx][c]
  }

  // 考虑idx该不该放进去，不让进去
  let res = bestValue(w, v, idx - 1, c)
  if (c >= w[idx]) { // 容量足够，放进该物品
    let cur = v[idx] + bestValue(w, v, idx - 1, c - w[idx])
    res = Math.max(res, cur)
  }
  memo[`${idx}-${c}`] = res
  return res
}

let weight /* */ = [2, 4, 5, 3];
let value /*  */ = [4, 1, 6, 5];
let cap /*    */ = 7;

console.log('结果为：', knapsack(weight, value, cap)) // 10
