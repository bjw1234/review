/**
 * initialize your data structure here.
 * 最小栈，获取最小值的时间复杂度为 O(1)
 */
const MinStack = function () {
  this.stack = []
  this.min = Number.MAX_SAFE_INTEGER
};

/** 
* @param {number} x
* @return {void}
*/
MinStack.prototype.push = function (x) {
  if (this.min >= x) { // 先保存次小值
    this.stack.push(this.min)
    this.min = x
  }
  this.stack.push(x)
};

/**
* @return {void}
*/
MinStack.prototype.pop = function () {
  if (this.stack.pop() === this.min) {
    // this.min 为上次的次小值
    this.min = this.stack.pop()
  }
};

/**
* @return {number}
*/
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1]
};

/**
* @return {number}
*/
MinStack.prototype.getMin = function () {
  return this.min
};

/**
* Your MinStack object will be instantiated and called as such:
*/
const obj = new MinStack()
obj.push(0)
obj.push(1)
obj.push(0)
obj.pop()
const param_3 = obj.top()
console.log(param_3) // 1
const param_4 = obj.getMin()
console.log(param_4) // 0
