/**
 * 快慢指针问题
 * 
 * 找到单链表倒数第n个节点，保证链表中节点的最少数量为n 两个指针，先让快指针走n步，然后一块儿走，快指针到头的时候，慢指针就是倒数第n个。
 */
public class Solution {
  public ListNode nthToLast(ListNode head, int n) {
    if (head == null || n < 0) {
      return null;
    }

    ListNode p1 = head;
    ListNode p2 = head;

    for (int i = 0; i < n; i++) {
      if (p1 == null)
        return null;
      p1 = p1.next;
    }

    while (p1 != null) {
      p1 = p1.next;
      p2 = p2.next;
    }

    return p2;
  }
}

class ListNode {
  int val;
  ListNode next;

  ListNode(int val) {
    this.val = val;
    this.next = null;
  }
}