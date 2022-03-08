
/**
 *  二叉树的中序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
/*
var preorderTraversal = function(root) {
  // 用于存储遍历的结果
  const res = []
  // 设置函数用于进行递归遍历
  const preorder = (root) => {
    // 当前结点为空时，无需进行递归
    if(!root) {
      return
    }

    // 前序遍历左子树
    preorder(root.left)

    // 记录根节点值
    res.push(root.val)

    // 前序遍历右子树
    preorder(root.right)
  }
  preorder(root)
  return res
}
*/

const preorderTraversal = function(root) {
  const res = []
  const stk = []
  while(root) {
    // 右子节点入
    stk.push(root)
  }
}