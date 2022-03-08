class Stack {
  constructor() {
    // 存储栈的数据
    // this.data = []
    this.data = {}  // 也可以用对象
    // 记录栈的数据个数（相当于数据的 length）
    this.count = 0
  }
  // 入栈方法
  push(item) {
    // 方法1：数组方法 push 添加
    // this.data.push(item)

    // 方式2：利用数据长度
    // this.data[this.data.length] = item

    // 方式3：计数方式
    this.data[this.count] = item
    // 入栈后，count自增
    this.count++
  }

  // 出栈方法
  pop() {
    // 出栈的前提是栈中存在元素，应先行检测
    if(this.isEmpty()) {
      console.log('栈为空')
      return
    }

    // 移除栈顶数据
    // 方式一: 数组方法 pop 移除
    // return this.data.pop()

    // 方式二：计数方式
    const temp = this.data[this.count - 1]
    delete this.data[--this.count]
    return temp
  }

  // 检测栈是否为空
  isEmpty() {
    return this.count === 0
  }

  // 用于获取栈顶值
  top() {
    if(this.isEmpty()) {
      console.log('栈为空')
      return
    }
    return this.data[this.count - 1]
  }

  // 获取元素个数
  size() {
    return this.count
  }

  // 清空
  clear() {
    this.data = []
    this.count = 0
  }
}


// 使用
const s = new Stack()
s.push(10)