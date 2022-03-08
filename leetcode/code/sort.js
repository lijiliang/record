/**
 * 基本冒泡排序
 */

function bubbleSort(arr) {
    // 缓存数组长度
    const len = arr.length
    // 外层循环用于控制从头到尾的比较+交换到底有多少轮
    for(let i=0;i<len;i++) {
        // 内层循环用于完成每一轮遍历过程中的重复比较+交换
        for(let j=0;j<len-1;j++) {
            // 若相邻元素前面的数比后面的大
            if(arr[j] > arr[j+1]) {
                // 交换两者
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }
    // 返回数组
    return arr
}


/**
 * 改进版冒泡排序
 */
// const arr = [1,1,2,3,2,-1,10,11,-9,6]
// function betterBubbleSort(arr) {
//   const len = arr.length;
//   for(let i=0; i<len; i++) {
//     console.log(i, len-1-i)
//     for(let j=0; j<len-1-i; j++) {
//       if(arr[j] > arr[j+1]) {
//         [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
//       }
//     }
//   }
//   return arr;
// }

function betterBubbleSort(arr) {
    const len = arr.length

    for(let i=0;i<len;i++) {
        // 区别在这里，我们加了一个标志位
        let flag = false
        for(let j=0;j<len-1-i;j++) {
            if(arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                // 只要发生了一次交换，就修改标志位
                flag = true
            }
        }

        // 若一次交换也没发生，则说明数组有序，直接放过
        if(flag == false)  return arr;
    }
    return arr
}

/**
 * 选择排序
 */
function selectSort(arr)  {
  // 缓存数组长度
  const len = arr.length
  // 定义 minIndex，缓存当前区间最小值的索引，注意是索引
  let minIndex
  // i 是当前排序区间的起点
  for(let i = 0; i < len - 1; i++) {
    // 初始化 minIndex 为当前区间第一个元素
    minIndex = i
    // i、j分别定义当前区间的上下界，i是左边界，j是右边界
    for(let j = i; j < len; j++) {
      // 若 j 处的数据项比当前最小值还要小，则更新最小值索引为 j
      if(arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    // 如果 minIndex 对应元素不是目前的头部元素，则交换两者
    if(minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  return arr
}

/**
 * 插入排序
 */
function insertSort(arr) {
  // 缓存数组长度
  const len = arr.length
  // temp 用来保存当前需要插入的元素
  let temp
  // i用于标识每次被插入的元素的索引
  for(let i = 1;i < len; i++) {
    // j用于帮助 temp 寻找自己应该有的定位
    let j = i
    temp = arr[i]
    // 判断 j 前面一个元素是否比 temp 大
    while(j > 0 && arr[j-1] > temp) {
      // 如果是，则将 j 前面的一个元素后移一位，为 temp 让出位置
      arr[j] = arr[j-1]
      j--
    }
    // 循环让位，最后得到的 j 就是 temp 的正确索引
    arr[j] = temp
  }
  return arr
}


function mergeSort(arr) {
  const len = arr.length;
  if(len <= 1) {
    return arr
  }
  const mid = Math.floor(len/2)
  const leftArr = mergSort(arr.slice(0, mid))
  const rightArr = mergSort(arr.slice(mid, len))

  arr = mergeArr(leftArr, rightArr)
  return arr
}

function mergeArr(arr1, arr2) {
  let i=0;j=0;
  const res = []
  const len1 = arr1.length;
  const len2 = arr2.length;
  while(i<len1 && j<len2) {
    if(arr1[i] < arr2[j]) {
      res.push(arr1[i])
      i++
    } else {
      res.push(arr2[j])
      j++
    }
  }

  if(i<len1) {
    return res.concat(ar1.slice(i))
  } else {
    res.concat(arr2.slice(j))
  }
}