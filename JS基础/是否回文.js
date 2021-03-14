// 也采用对撞指针的方法 O(n)
function isReverse(str) {
  let l = 0, r = str.length - 1;
  while (l < r) {
    while (!/[a-zA-Z]/.test(str[l])) l++;
    while (!/[a-zA-Z]/.test(str[r])) r--;
    if (str[l].toLowerCase() !== str[r].toLowerCase()) return false;
    l++;
    r--;
  }
  return true;
}

const str = 'A man a plan, a canal; Panama';
console.log(isReverse(str));
