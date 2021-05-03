Function.prototype.myBind = function (context, ...args1) {
  if (typeof this !== 'function') {
    throw new Error('current this is not a function.')
  }
  const fn = this
  const ctx = context ? Object(context) : window
  return function (...args2) {
    if (new.target) { // new call
      return new fn(...[...args1, ...args2])
    }
    return fn.apply(ctx, [...args1, ...args2])
  }
}

let value = 2;
let foo = {
  value: 1
};
function bar(name, age) {
  this.habit = 'shopping';
  console.log('this.value=>', this.value);
  console.log('this.name=>', name);
  console.log('this.age=>', age);
}
bar.prototype.friend = 'kevin';

let bindFoo = bar.myBind(foo, 'Jack');
let obj = new bindFoo(20);
let obj2 = bindFoo(21);
console.log(obj);
console.log(obj2);
console.log('------------')
let bindFoo2 = bar.bind(foo, 'bjw')
obj = new bindFoo2(20);
obj2 = bindFoo2(21);
console.log(obj);
console.log(obj2);