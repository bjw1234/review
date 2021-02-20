/**
 * 1.创建一个新的对象，使该对象的原型指向其构造函数的原型对象
 * 2.以该对象为上下文，执行构造函数
 * 3.返回新的对象
 * 
 * @param {*} cons 构造函数
 * @param  {...any} params 参数 
 */
function New(cons, ...params) {
  const obj = Object.create(cons.prototype);
  cons.apply(obj, params);
  return obj;
}
