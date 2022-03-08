/**
 *  包含 min 函数的栈
 */
class MinStack {
  constructor () {
    this.stack = []
  }
  // 入栈
  push(item) {
    this.stack.push(item)
  }

  top() {
    return this.stack[this.stack.length - 1]
  }

  // 实现最小值功能
  min() {
    return Math.min.apply(null, this.stack)
  }

  // 出栈方法

  pop() {
    return this.stack.pop()
  }
}