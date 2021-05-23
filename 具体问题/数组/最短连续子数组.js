// 数组和一个数字s,找到最短的连续子数组， 和 >=s, 返回子数组长度

function minSubArrLen2(nums, s) {
  // 2,5,7,1,7,9
  let l = 0, r = -1; // [l, r]
  let tempSum = 0; // 暂存子数组的和
  let ret = nums.length + 1; // 子数组长度
  while (r < nums.length && l < nums.length) {
    if (tempSum >= s) {
      tempSum -= nums[l];
      console.log(r - l + 1);
      ret = Math.min(ret, r - l + 1);
      l++;
    } else {
      r++;
      tempSum += nums[r];
    }
  }
  // 兼容不满足条件的值
  if (ret === nums.length + 1) return 0;
  return ret;
}


const arrs = [2, 5, 7, 1, 7, 9];
console.log('len2', minSubArrLen2(arrs, 9));














function minSubArrLen(target, nums) {
  let l = 0, r = -1; // nums[l ,r]为我们的滑动窗口 -1，不想让窗口中有值
  let sum = 0;
  let min = nums.length + 1; // 数组长度
  while (l < nums.length) {
    if (r + 1 < nums.length && sum < target) {
      r++;
      sum += nums[r];
    } else {
      sum -= nums[l];
      l++;
    }

    if (sum >= target) {
      min = Math.min(min, r - l + 1);
    }
  }

  if (min === nums.length + 1) return 0;

  return min;
}

const arr = [3, 2, 1, 4, 5, 6, 7];
console.log(minSubArrLen(17, arr));
