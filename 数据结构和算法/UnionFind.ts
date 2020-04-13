/**
 * 并查集 每个元素都有个指向父元素的指针，
 * 我们这里把它抽象为数组(parent)的值。
 * 
 * 
 * 一种树形结构，解决的是连接问题。
 * 判断网络中两个节点的连接状态
 * rank[i] 根节点为i的数的高度
 */
export default class UnionFind {
  private parent: number[];
  // rank[i] 表示以i为根的集合所表示的树的层数
  private rank: number[];
  private count: number;

  constructor(n) {
    this.count = n;
    this.rank = [];
    this.parent = [];
    for (let i = 0; i < this.count; i++) {
      this.parent[i] = i;
      // 表示只有一层
      this.rank[i] = 1;
    }
  }

  find(p: number): number {
    if (p < 0 || p >= this.count) {
      throw new Error('p is not in range: 0-count');
    }
    while (p !== this.parent[p]) {
      // p = this.parent[p];
      // 路径压缩 parent[p] -> parent的parent
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }
    return p;
  }

  union(p, q) {
    let pRoot = this.find(p);
    let qRoot = this.find(q);

    if (qRoot === pRoot) return;
    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot;
    } else if (this.rank[qRoot] < this.rank[pRoot]) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[pRoot] = qRoot;
      this.rank[qRoot] += 1;
    }
  }

  isConnected(p, q): boolean {
    return this.find(p) === this.find(q);
  }
}

const n = 1000000;
const uf = new UnionFind(n);

const s = Date.now();

for (let i = 0; i < n; i++) {
  const a = Math.random() * n;
  const b = Math.random() * n;
  uf.union(a, b);
}

for (let i = 0; i < n; i++) {
  const a = Math.random() * n;
  const b = Math.random() * n;
  uf.isConnected(a, b);
}

const e = Date.now();
console.log(`${n} 个元素，执行操作时间：${e - s} ms`)

// uf.union(1, 4)
// console.log(uf.isConnected(1, 4)) // true
// console.log(uf.isConnected(2, 4)) // false



