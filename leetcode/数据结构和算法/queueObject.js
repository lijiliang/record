// 队列 对象的实现方式
class Queue {
  constructor() {
    // 用于存储队列数据
    this.queue = {}
    this.count = 0
    // 用于记录队首的键
    this.head = 0
  }

  // 入队方法
  enQueue(item) {
    this.queue[this.count++] = item
  }

  // 出队方法
  deQueue() {
    if(this.isEmpty()) {
      return
    }
    const headData = this.queue[this.head]

    // 删除 queue 的第一个元素
    delete this.queue[this.head]
    this.head++
    this.count--
    return headData
  }

  // 检测是否为空
  isEmpty() {
    return this.count === 0
  }

  // 获取队首元素值
  top() {
    if(this.isEmpty()) {
      return
    }
    return this.queue[0]
  }

  // 获取队列的个数
  size() {
    return this.count
  }

  // 清空
  clear() {
    this.queue = {}
    this.count = 0
    this.head = 0
  }
}

const q = new Queue()
q.enQueue('a')
q.enQueue('a')
q.deQueue()
q.top()
q.size()
q.clear()