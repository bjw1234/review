import java.util.Collections;
import java.util.Vector;

/**
 * 稠密图 - 邻接矩阵
 * 
 * 二维矩阵，x, y轴 （a, b）可以确定a和b点是否相连
 */
public class DenseGraph {

  // 节点数和边数
  private int n, m;
  // 是否有向图
  private boolean directed;
  private Vector<Vector<Boolean>> g;

  // 初始化
  public DenseGraph(int n, boolean directed) {
    this.n = n;
    this.m = 0;
    this.directed = directed;
    this.g = new Vector<>();
    for (int i = 0; i < n; i++) {
      g.add(new Vector<Boolean>(Collections.nCopies(n, false)));
    }
  }

  // 返回节点数
  public Integer V() {
    return n;
  }

  // 返回边数
  public Integer E() {
    return m;
  }

  public Vector<Boolean> graph(int i) {
    return g.get(i);
  }

  // 在顶点v,w之间添加一条边
  public void addEdge(int v, int w) {
    assert (v >= 0 && v < n);
    assert (w >= 0 && w < n);

    if (hasEdge(v, w))
      return;

    g.get(v).set(w, true);
    if (!directed) {
      g.get(w).set(v, true);
    }

    m++;
  }

  public boolean hasEdge(int v, int w) {
    assert (v >= 0 && v < n);
    assert (w >= 0 && w < n);
    return g.get(v).get(w);
  }

  public static void main(String[] args) {
    // Vector<Boolean> v = new Vector<>(Collections.nCopies(10, false));
    // System.out.println(v);
    // DenseGraph d = new DenseGraph(10, false);
    // d.addEdge(3, 2);
    // System.out.println(d.hasEdge(2, 3));
    int N = 20;
    int M = 100;
    DenseGraph g = new DenseGraph(N, false);

    for (int i = 0; i < M; i++) {
      int a = (int) (Math.random() * N);
      int b = (int) (Math.random() * N);
      g.addEdge(a, b);
    }

    for (int i = 0; i < N; i++) {
      System.out.print(i + ": ");
      Vector<Boolean> graph = g.graph(i);
      for (int j = 0; j < graph.size(); j++) {
        if (graph.get(j)) {
          System.out.print(j + ", ");
        }
      }
      System.out.println("");
    }

  }

}
