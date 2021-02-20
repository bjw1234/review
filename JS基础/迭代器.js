let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true, value: this.current }
    }
  }
};
// 对于一个迭代器来说，需要一个名为 Symbol.iterator 的方法
// 这个方法必须返回一个有next方法的对象。（对于如上例子来说就是自身）
// 数组、字符串都是可迭代的，意味着可以使用 for of 遍历

for (let num of range) {
  console.log(num);
}