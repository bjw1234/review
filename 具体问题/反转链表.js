/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
  if (!head) return head
  let prev = null, cur = head, next = head.next
  while (next) {
    cur.next = prev
    prev = cur
    cur = next
    next = next.next
  }
  return cur
};
