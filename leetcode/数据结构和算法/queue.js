class Queue {
  constructor() {
    // 用于存储队列数据
    this.queue = []
    this.count = 0
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
    // 删除 queue 的第一个元素
    // delete this.queue[0]  // 不能通过这种方式去删除数据的第一个值，删除后数组的位置和长度是不变的，只是将值删除了而已
    this.count--
    return this.queue.shift()
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
    // this.queue = []
    this.queue.length = 0
    this.count = 0
  }
}

const q = new Queue()
q.enQueue('a')
q.enQueue('a')
q.deQueue()
q.top()
q.size()
q.clear()