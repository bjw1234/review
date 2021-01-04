import java.util.Iterator;
import java.util.Vector;

// 稀疏图  - 邻接表
public class SparseGraph implements Iterable<Vector<Integer>> {
  private int n, m; // 节点和边数
  private boolean directed;
  private Vector<Vector<Integer>> g;

  public SparseGraph(int n, boolean directed) {
    this.n = n;
    this.m = 0;
    this.directed = directed;
    this.g = new Vector<>();
    for (int i = 0; i < n; i++) {
      g.add(new Vector<Integer>());
    }
  }

  public int V() {
    return n;
  }

  public int E() {
    return m;
  }

  // 会有平行边的问题
  public void addEdge(int v, int w) {
    assert (v >= 0 && v < n);
    assert (w >= 0 && w < n);

    // if (hasEdge(v, w))
    // return;

    g.get(v).add(w);
    if (v != w && !directed) {
      g.get(w).add(v);
    }
    m++;
  }

  public boolean hasEdge(int v, int w) {
    assert (v >= 0 && v < n);
    assert (w >= 0 && w < n);
    for (int val : g.get(v)) {
      if (val == w)
        return true;
    }
    return false;
  }

  @Override
  public Iterator<Vector<Integer>> iterator() {
    return new Iterator<Vector<Integer>>() {

      private int i = 0;

      @Override
      public boolean hasNext() {
        return i < g.size();
      }

      @Override
      public Vector<Integer> next() {
        Vector<Integer> ret = g.get(i);
        i++;
        return ret;
      }

    };
  }

  public static void main(String[] args) {
    int N = 20;
    int M = 100;
    SparseGraph g = new SparseGraph(N, false);

    for (int i = 0; i < M; i++) {
      int a = (int) (Math.random() * N);
      int b = (int) (Math.random() * N);
      g.addEdge(a, b);
    }

    int index = 0;
    for (Vector<Integer> vector : g) {
      System.out.print(index + ": ");
      System.out.println(vector);
      index++;
    }

  }
}