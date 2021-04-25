/**
 * @param {*} A 
 * @param {*} B 
 * @param {*} C 
 * @param {*} D 
 *
 *  数组长度一致
 * 给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。
 */
// 为了在1s左右算出结果，至少得设计一个N2级别的算法。也就是可能遍历A、B两个数组。其余两个通过map实现。
const fourSumCount = function (A, B, C, D) {
  let result = 0;
  const map = new Map();
  for (let i = 0; i < C.length; i++) {
    for (let j = 0; j < D.length; j++) {
      const sum = C[i] + D[j];
      if (map.has(sum)) {
        map.set(sum, map.get(sum) + 1);
      } else {
        map.set(sum, 1);
      }
    }
  }
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      const sum = A[i] + B[j];
      const target = 0 - sum;
      if (map.has(target)) {
        result += map.get(target);
      }
    }
  }
  return result;
};