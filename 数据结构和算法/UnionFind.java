import java.util.Date;

public class UnionFind {
  private int[] parent;
  private int[] rank;
  private int count;

  public UnionFind(int n) {
    this.count = n;
    this.parent = new int[n];
    this.rank = new int[n];
    for (int i = 0; i < n; i++) {
      this.parent[i] = i;
      this.rank[i] = 1;
    }
  }

  public Integer find(int p) {
    if (p < 0 || p >= count) {
      throw new Error("params range is not in: 0~count");
    }
    while (p != parent[p]) {
      // 路径压缩对性能的优化
      // 10000000 4972 ms -- 3819 ms
      parent[p] = parent[parent[p]];
      p = parent[p];
    }
    return p;
  }

  public boolean isConnected(int p, int q) {
    int pRoot = find(p);
    int qRoot = find(q);
    return pRoot == qRoot;
  }

  public void union(int p, int q) {
    int pRoot = find(p);
    int qRoot = find(q);
    if (pRoot == qRoot)
      return;
    if (rank[pRoot] < rank[qRoot]) {
      parent[pRoot] = qRoot;
    } else if (rank[qRoot] < rank[pRoot]) {
      parent[qRoot] = pRoot;
    } else {
      parent[pRoot] = qRoot;
      rank[qRoot] += 1;
    }
  }

  public static void main(String[] args) {
    int n = 1000000;
    UnionFind uf = new UnionFind(n);

    long s = new Date().getTime();
    for (int i = 0; i < n; i++) {
      int a = (int) (Math.random() * n);
      int b = (int) (Math.random() * n);
      uf.union(a, b);
    }
    for (int i = 0; i < n; i++) {
      int a = (int) (Math.random() * n);
      int b = (int) (Math.random() * n);
      uf.isConnected(a, b);
    }
    long e = new Date().getTime();
    System.out.println(n + "个元素，执行操作时间：" + (e - s) + " ms");

    // uf.union(1, 4);
    // System.out.println(uf.isConnected(1, 4)); // true
    // System.out.println(uf.isConnected(2, 4)); // false
  }
}
