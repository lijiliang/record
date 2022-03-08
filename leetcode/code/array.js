/*
 * @Descripttion:
 * @Author: Benson
 * @Date: 2021-08-31 22:19:06
 * @LastEditors: Benson
 * @LastEditTime: 2021-08-31 23:01:28
 */

/**
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
export const twoSum = function(nums, target) {
  // 这里我用对象来模拟 map 的能力
  const diffs = {}
  // 缓存数组长度
  const len = nums.length
  // 遍历数组
  for(let i=0;i<len;i++) {
      // 判断当前值对应的 target 差值是否存在（是否已遍历过）
      if(diffs[target-nums[i]]!==undefined) {
          // 若有对应差值，那么答案get！
          return [diffs[target - nums[i]], i]
      }
      // 若没有对应差值，则记录当前值
      diffs[nums[i]]=i
  }
};

/**
 * 上题目Map的实现方式
 * @param {*} nums
 * @param {*} target
 * @returns
 */
export const twoSumMap = (nums, target) => {
  const len = nums.length;
  const map = new Map();
  for(let i =0; i<len; i++) {
    const cachedIdx = map.get(target - nums[i]);
    if(cachedIdx !== undefined) {
      return [cachedIdx, i]
    }
    map.set(nums[i], i)
  }
}



/**
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
export const merge = function(nums1, m, nums2, n) {
    // 初始化两个指针的指向，初始化 nums1 尾部索引k
    let i = m - 1, j = n - 1, k = m + n - 1
    // 当两个数组都没遍历完时，指针同步移动
    while(i >= 0 && j >= 0) {
        // 取较大的值，从末尾往前填补
        if(nums1[i] >= nums2[j]) {
            nums1[k] = nums1[i]
            // console.log(i, j,k, nums1)
            i--
            k--
        } else {
          // console.log('else', i, j,k, nums1)
            nums1[k] = nums2[j]
            j--
            k--
        }
    }

    // nums2 留下的情况，特殊处理一下
    while(j>=0) {
        nums1[k] = nums2[j]
        j--
        k--
    }
    return nums1
};

// let merge = function(nums1, m, nums2, n) {
//   while(n > 0) {
//     if(nums1[m-1] > nums2[n-1]) {
//       nums1[m + n -1] = nums1[--m]
//     }else {
//       nums1[m+n-1] = nums2[--n]
//     }
//   }
//   return nums1
// }

/**
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
 * @param {number[]} nums
 * @return {number[][]}
 */

const threeSum = function(nums) {
  // 用于存放结果的数组
  let res = [];
  // 给nums排序
  nums = nums.sort((a, b) => {
    return a - b;
  })
  // 缓存数组长度
  const len = nums.length;

  // 注意我们遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
  for(let i = 0; i < len - 2; i++) {
    // 左指针 j
    let j = i + 1;
    // 右指针
    let k = len - 1;
    // 如果遇到重复的数字，则跳过
    if(i>0 && nums[i] === nums[i-1]) {
      continue;
    }
    while(j<k) {
      // 三数之和小于0，左指针前进
      if(nums[i] + nums[j] + nums[k] < 0) {
        j++;
        // 处理左指针元素重复的情况
        while(j<k && nums[j] === nums[k] > 0) {
          j++;
        }
      } else if(nums[i] + nums[j] + nums[k] > 0) {
        // 三数之和大于0，右指针后退
        k--;
        // 处理右指针元素重复的情况
        while(j<k && nums[k] === nums[k+1]) {
          k--;
        }
      } else {
        // 得到目标数字组合，推入结果数组
        res.push([nums[i], nums[j], nums[k]])

        // 左右指针一起前进
        j++
        k--

        // 若左指针元素重复，跳过
        while(j<k && nums[j] === nums[j-1]){
          j++
        }

        // 若右指针元素重复，跳过
        while(j<k && nums[k] === nums[k+1]) {
          k--
        }
      }
    }
  }
  // 返回结果数组
  return res;
}