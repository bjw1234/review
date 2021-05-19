/**
 * infer 的用法
 * 只能在 泛型条件语句中使用
 */

type MyParameters<T> = T extends ((...args: infer R) => any) ? R : unknown

function getSomething(name: string, age: number) {
  return { name, age }
}

// typeof 可以获取一个对象/实例的类型
type params = MyParameters<typeof getSomething>




/**
 * keyof 获取所有类型的键值，返回一个联合类型
 */
interface Person {
  name: string
  age: number
}
// 添加一个 children 属性
type P2 = Person & { children: number[] }

type personKey = keyof P2
function pkey(obj: P2, key: personKey) {
  return obj[key]
}
// 测试
const obj: P2 = { name: 'bjw', age: 25, children: [] }
pkey(obj, 'name') // bjw

// 项目实战
interface API {
  '/user': { name: string }
  '/menu': { foods: string[] }
}
const wrappedFetch = <URL extends keyof API>(url: URL): Promise<API[URL]> => {
  return fetch(url).then(res => res.json())
}
wrappedFetch('/user').then(res => res.name)




/**
 * in 可以对枚举类型遍历
 * 遍历T类型的所有键，将值更改为number类型
 */
type TypeToNumber<T> = {
  [key in keyof T]: number
}
const personValue: TypeToNumber<Person> = { name: 43, age: 22 }




/**
 * 泛型工具
 */
// 全部属性可选
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}
// 全部属性必选
type MyRequired<T> = {
  [R in keyof T]-?: T[R]
}
// 提取键列表
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
// Omit, Exclude 

const test: MyPick<Person, 'name'> = { name: 'xx' }




/**
 * 泛型递归
 */
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

const a = { foo: { bar: 4 } }
const b = a as DeepReadonly<typeof a>
// Cannot assign to 'bar' because it is a read-only property.
// b.foo.bar = 3




/**
 * 类型谓词
 */
class Fish {
  swim() { console.log('swim...') }
}
class Dog {
  eat() { console.log('eat...') }
}

// 当函数返回true，参数类型就是类型谓词中的类型
function isDogType(cls: Fish | Dog): cls is Dog {
  return cls instanceof Dog
}

function callFunc(v: Fish | Dog) {
  if (isDogType(v)) {
    v.eat()
  } else {
    v.swim()
  }
}




/**
 * 类型定义文件
 * typings文件夹，让TS识别.less文件
 */
declare module '*.less' {
  const resource: { [key: string]: string }
  export = resource
}
