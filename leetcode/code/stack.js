/**
题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 */
// 用一个 map 来维护左括号和右括号的对应关系
const leftToRight = {
  "(": ")",
  "[": "]",
  "{": "}"
};

/**
 * @param {string} s
 * @return {boolean}
 */
export const isValid = function(s) {
  // 结合题意，空字符串无条件判断为 true
  if (!s) {
    return true;
  }
  // 初始化 stack 数组
  const stack = [];
  // 缓存字符串长度
  const len = s.length;
  // 遍历字符串
  for (let i = 0; i < len; i++) {
    // 缓存单个字符
    const ch = s[i];
    // 判断是否是左括号，这里我为了实现加速，没有用数组的 includes 方法，直接手写判断逻辑
    if (ch === "(" || ch === "{" || ch === "[") stack.push(leftToRight[ch]);
    // 若不是左括号，则必须是和栈顶的左括号相配对的右括号
    else {
      // 若栈不为空，且栈顶的左括号没有和当前字符匹配上，那么判为无效
      if (!stack.length || stack.pop() !== ch) {
        return false;
      }
    }
  }
  // 若所有的括号都能配对成功，那么最后栈应该是空的
  return !stack.length;
};

/**
设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
 */
/**
 * 初始化你的栈结构
 */
const MinStack = function() {
  this.stack = []
};

/**
 * @param {number} x
 * @return {void}
 */
// 栈的入栈操作，其实就是数组的 push 方法
MinStack.prototype.push = function(x) {
  this.stack.push(x)
};

/**
 * @return {void}
 */
// 栈的入栈操作，其实就是数组的 pop 方法
MinStack.prototype.pop = function() {
  this.stack.pop()
};

/**
 * @return {number}
 */
// 取栈顶元素，咱们教过的哈，这里我本能地给它一个边界条件判断（其实不给也能通过，但是多做不错哈）
MinStack.prototype.top = function() {
  if(!this.stack || !this.stack.length) {
      return
  }
  return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
// 按照一次遍历的思路取最小值
MinStack.prototype.getMin = function() {
    let minValue = Infinity
    const  { stack } = this
    for(let i=0; i<stack.length;i++) {
        if(stack[i] < minValue) {
            minValue = stack[i]
        }
    }
    return minValue
};

const MinStackTwo = function() {
  this.stack = []
  this.stack2 = []
}

MinStackTwo.prototype.push = function(x) {
  this.stack.push(x);
  // 若入栈的值小于当前最小值，则推入辅助栈栈顶
  if(this.stack2.length === 0 || this.stack2[this.stack2.length - 1] >= x) {
    this.stack2.push(x)
  }
}

MinStackTwo.prototype.pop = function() {
  if(this.stack.pop() === this.stack2[this.stack2.length - 1]) {
    this.stack2.pop()
  }
}

MinStackTwo.prototype.top = function() {
  return this.stack[this.stack.length - 1]
}

MinStackTwo.prototype.getMin = function() {
  return this.stack2[this.stack2.length - 1]
}


/**
如何用栈实现一个队列？
 */
const MyQueue = function() {
  this.stack1 = []
  this.stack2 = []
}

MyQueue.prototype.push = function(x) {
  this.stack1.push(x)
}

MyQueue.prototype.pop = function() {
  if(this.stack1.length <= 0 ) {
    while(this.stack1.length !== 0) {
      this.stack2.push(this.stack1.pop())
    }
  }

  return this.stack2.pop()
}

MyQueue.prototype.peek = function() {
  if(this.stack1.length <= 0) {
    while(this.stack1.length != 0) {
      this.stack2.push(this.stack1.pop())
    }
  }

  const stack2Len = this.stack2.length;
  return stack2Len && this.stack2[stack2Len - 1]
}

MyQueue.prototype.empty = function() {
  return !this.stack1.length && !this.stack2.length;
}


/**
 * 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
export const maxSlidingWindow = function (nums, k) {
  // 缓存数组的长度
  const len = nums.length;
  // 定义结果数组
  const res = [];
  // 初始化左指针
  let left = 0;
  // 初始化右指针
  let right = k - 1;
  // 当数组没有被遍历完时，执行循环体内的逻辑
  while (right < len) {
    // 计算当前窗口内的最大值
    const max = calMax(nums, left, right);
    // 将最大值推入结果数组
    res.push(max);
    // 左指针前进一步
    left++;
    // 右指针前进一步
    right++;
  }
  // 返回结果数组
  return res;
};

// 这个函数用来计算最大值
function calMax(arr, left, right) {
  // 处理数组为空的边界情况
  if (!arr || !arr.length) {
    return;
  }
  // 初始化 maxNum 的值为窗口内第一个元素
  let maxNum = arr[left];
  // 遍历窗口内所有元素，更新 maxNum 的值
  for (let i = left; i <= right; i++) {
    if (arr[i] > maxNum) {
      maxNum = arr[i];
    }
  }
  // 返回最大值
  return maxNum;
}

function BFS(root) {
  const queue = []
  queue.push(root)
  while(queue.length) {
    const top = queue[0]
    console.log(top.val)
    if(top.left) {
      queue.push(top.left)
    }
    if(top.right) {
      queue.push(top.right)
    }
    queue.shift()
  }
}

const permute = function(nums) {
  const len = nums.length;
  const curr = []
  const  res = []
  const visited = {}
  function dfs(nth) {
    if(nth === len){
      res.push(curr.slice())
      return
    }
    for(let i = 0; i<len; i++) {
      if(!visited[nums[i]]) {
        visited[nums[i]] = 1
        curr.push(nums[i])
        dfs(nth+1)
        curr.pop()
        visited[nums[i]] = 0
      }
    }
  }
  dfs[0]
  return res
}