/**
 * 环路检测
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  if(head === null || head.next === null) {
    return null
  }

  // 声明快慢指针
  let slow = head // 慢指针，移动1位
  let fast = head // 快指针，移动2位

  while(fast !== null) {
    // 慢指针，每次移动1位
    slow = slow.next

    // 如果满足条件，说明 fast 为尾部结点，不存在环
    if(fast.next === null) {
      return null
    }
    // 快指针，每次移动2位
    fast = fast.next.next

    // 检测是否有环
    if(fast === slow) {
      // 找到环的起点位置
      let ptr = head
      while (ptr !== slow) {
        prt = prt.next
        slow = slow.next
      }
      // ptr 和 slow 的交点就是环的起始节点
      return ptr
    }
  }

  // while 结束，说明 fast 为 null, 说明链表没有环
  return null
}