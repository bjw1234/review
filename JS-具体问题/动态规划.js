// 动态规划：
// 将原问题拆解成若干子问题，同时保存子问题的答案，使得
// 每个子问题只求解一次，最终获得原问题的答案。


//                        --> 记忆化搜索（自顶向下解决问题）
// 递归问题 --> 重叠子问题 -|    |
//                        --> 动态规划（自底向上解决问题）
// 70 爬楼梯 n 1或者2

// 0:0 1:1 2:2 3:3  12 111 21
// n --> n - 1 + 1 或 n - 2 + 2
// count(n) => count(n-1) + count(n-2)

function count(n) {
  if (n === 1) return 1
  if (n === 2) return 2
  return count(n - 1) + cont(n - 2)
}

// 120 Triangle
function Triangle() {

}

// 343 n 分割成 多个数字的和，让乘积最大，返回最大乘积


// 递归分解成子问题
// 4 -> 
// 1 + 3(最大乘积)  --> 
// 2 + 2(最大乘积)
// 3 + 1(最大乘积)
function intergerBreak(n) {
  return breakInteger(n)
}

const map = new Map()

// 将 n 分割（至少两部分）可以获得的最大乘积
function breakInteger(n) {
  if (n === 1) return 1
  if (map.has(n)) return map.get(n)

  // 遍历所有分割的可能性
  let ret = -1
  for (let i = 1; i < n - 1; i++) {
    // 为了保证至少有两部分 i * (n - i)
    ret = Math.max(breakInteger(n - i), i * (n - i), ret)
  }
  map.set(n, ret)
  return ret
}

// 3 + 3 + 4
console.log(intergerBreak(10)) // 36
console.log(intergerBreak(100)) // 2500

// 动态规划方式求解，先解决最基本的问题
const memo = new Map() // memo[i]表示数字i分隔后的最大乘积
function intergerBreak2(n) {
  memo[1] = 1
  // assert(n >= 2)
  for (let i = 2; i <= n; i++) { // 求解所有的子问题
    for (let j = 1; j <= i - 1; j++) { // 求解memo【i】
      memo[i] = Math.max(memo[i] || -1, j * (i - j), j * memo[i - j])
    }
  }
  return memo[n]
}

console.log(intergerBreak2(11)) // 2500



/**
 * n个房子
 * 状态的定义：考虑 偷盗[i, n-1]区间内的房子，价值最大 f(i)
 * 状态转移：max{ v(0) + f(2), v(1) + f(3)... }
 */

// 计算偷盗价值最大是多少？ 限制：不能偷连续的两个房子。

// 如果计划偷盗 0 号房子，那么接下来就应该考虑 [2, n-1] 区间的房子。

// 状态的定义：考虑偷盗 [i, n - 1] 范围内的房子 --- 函数的定义
// 状态转义方程：v = max{ v(0) + f(2), v(1) + f(3)... }

// 采用记忆化搜索的方式进行优化
const memoRob = new Map()

function tryRob(arr, idx) {
  if (idx >= arr.length) return 0
  let ret = 0

  if (memo.has(idx)) return memo.get(idx)

  for (let i = idx; i < arr.length; i++) {
    ret = Math.max(ret, arr[i] + tryRob(arr, i + 2))
  }

  memoRob.set(idx, ret)
  return ret
}

function rob(arr) {
  return tryRob(arr, 0) // 从考虑偷取第0个房子开始
}

const arr = [2, 4, 1, 5, 3]
console.log('最大价值：', rob(arr))


// 使用动态规划的方式解决问题，求解子问题获得最终结论的方式
function rob2(arr) {
  const n = arr.length
  if (n === 0) return 0

  // memo[i] 表示抢劫 [i..n-1]所获取的最大收益
  const memo = new Map()
  memo.set(n - 1, arr[n - 1]) // 已经有初始的 n-1
  for (let i = n - 2; i >= 0; i--) {
    // memo[i]
    for (let j = i; j < n; j++) {
      const cur = arr[j] + (j + 2 < n ? (memo.get(j + 2) || 0) : 0)
      console.log(cur, arr[j])
      memo.set(i, Math.max(memo.get(i), cur))
    }
  }
  return memo.get(0)
}

console.log(rob2(arr))
