
// var isValidBST = function(root) {
//   return helper(root, -Infinity, Infinity)
// }

// const helper = (root, lower, upper) => {
//   if(!root) {
//     return true
//   }

//   // 检测当前结点是否超出边界
//   if(root.val >= upper || root.val <= lower) {
//     return false
//   }

//   // 当前节点通过检测，再检测左右子节点
//   return helper(root.left, lower, root.val) && helper(root.right, root.val, upper)
// }


var isValidBST = function(root) {
  const stk = []
  // 声明变量，记录当前操作的节点，用于下次获得的节点进去比对
  let oldNode = -Infinity

  while(root || stk.length) {
    while(root) {
      stk.push(root)
      root = root.left
    }
    root = stk.pop()
    if(root.val <= oldNode) {
      return false
    }

    oldNode = root.val
    root = root.right
  }
  return true
}

// JS  弱类型产生的问题
// 例子1
const obj = {}
obj.foo()  // 类型异常在运行时才会被发现

// 例子2
function sum(a, b) {
  return a + b
}
console.log(sum(10, 30))
console.log(sum(10, '30'))  // 函数传的参数不同，导致函数功能发生改变

// 例子3
const obj = {}
obj[true] = 100
console.log(obj['true'])  // 对象的key会自动转为字符串