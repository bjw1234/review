// 给定一个二维数组，如果值为1，那说明两个城市连通。
// 求解省份的个数
const arr = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1]
]

const getProvinceNum = (citiesConnected) => {
  const cities = citiesConnected.length
  const visited = new Map() // 如果有值，说明已经遍历过了
  let result = 0

  const dfs = (i) => {
    for (let j = 0; j < cities; j++) {
      if (citiesConnected[i][j] === 1 && !visited.has(j)) {
        visited.set(j, true)
        dfs(j)
      }
    }
  }

  for (let i = 0; i < cities; i++) {
    if (!visited.has(i)) {
      dfs(i)
      result++
    }
  }

  return result
}


console.log(getProvinceNum(arr)) // 2


// 使用并查集的方式求解
// 并查集，并：合并两个树 查：查询节点连通性
class UnionFind {
  constructor(n) {
    this.head = []
    this.height = [] // 每个根节点对应的高度
    for (let i = 0; i < n; i++) {
      this.head[i] = i
      this.height[i] = 1
    }
  }

  // 合并
  union(p, q) {
    const proot = this.find(p)
    const qroot = this.find(q)

    if (proot === qroot) return
    if (this.height[proot] < this.height[qroot]) {
      this.head[proot] = qroot
    } else if (this.height[proot] > this.height[qroot]) {
      this.head[qroot] = proot
    } else {
      this.head[proot] = qroot
      this.height[proot] += 1
    }
  }

  // 查找头结点
  find(x) {
    if (this.head[x] === x) return x
    // 统一头结点，路径压缩
    this.head[x] = this.find(this.head[x])
    return this.head[x]
  }
}

const getProvinceNum2 = (citiesConnected) => {
  const cities = citiesConnected.length
  const uf = new UnionFind(cities)
  for (let i = 0; i < cities; i++) {
    for (let j = i + 1; j < cities; j++) {
      if (citiesConnected[i][j] === 1) {
        uf.union(i, j)
      }
    }
  }
  console.log(uf)
  return new Set(uf.head).size
}

console.log(getProvinceNum2(arr))
