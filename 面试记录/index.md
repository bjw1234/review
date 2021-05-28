# 2021年5月份面试总结

**字节一面（大力教育）**

1.es6相关特性。

2.箭头函数和普通函数的区别。

3.for...of和for...in区别，forEach如何中途退出(`throw Error()`)

4.浏览器渲染过程。（`解析-布局-渲染-光栅化`）

5.css硬件加速方式。

6.用css实现一个梯形。（`手写`）

7.说出一下输出内容：

```js
var a = 1;
function foo() {
    var b = 2;
    console.log(b + this.a);
    console.log(b+a)
}
const foo1=()=>{
    var b = 2;
    console.log(b + this.a);
    console.log(b+a)
}
function foo2() {
    var a = 4;
    foo();
    foo1();
}
const obj={
    a:2,
    foo2
}
foo2();
obj.foo2()

```

8.实现`promise.all`函数：

```js
myPromise(list).then(res => {console.log(res)})
// 并发，then调用
```

9.实现`fetch`的`timeout`:

```js
myFetch()
fetch(url, timeout)
```



**字节二面（大力教育）**

第一题

```js
let a = {
    val: 1,
    left: {
        val: 2
    },
    right: {
        val: 3
    }
};

function leafSum(root) {
    // 计算叶子节点的值的和
}

const sum = leafSum(a) // sum: 5
```



第二题

```js
let a = {
    val: 1,
    left: {
        val: 2
    },
    right: {
        val: 3
    }
};

function path(root, val) {
  // 查找路径
}

const p = path(a, 3); // [1, 3]
```



第三题

```js
let a = {
    val: 1,
    left: {
        val: 2
    },
    right: {
        val: 3
    }
};

function distance(root, a, b) {
    // 计算 a， b 的距离
}

const d = distance(a, 3, 2); // 2
```



第三题答案

```js
//line=readline()
//print(line)
function distance(root, a, b) {
    // 计算 a， b 的距离
      const fatherNode = commonFatherNode(root, a, b)
      const disA = getDistance(root, a)
      const disB = getDistance(root, b)
      const disC = getDistance(root, fatherNode.val)
      const x = disA + disB - 2 * disC
      return x
}

function getDistance(root, val) {
    let level = 0
    const queue = []
    queue.push(root)
    while(queue.length > 0) {
        const size = queue.length
        level++
        for(let i = 0; i < size; i++) {
            const tempNode = queue.shift()
            if(tempNode.val === val) return level
            if(tempNode.left) queue.push(tempNode.left)
            if(tempNode.right) queue.push(tempNode.right)
        }
    }
    return -1
}

function commonFatherNode(root, a, b) {
    if(root === null || root.val === a || root.val === b) return root
    const left = commonFatherNode(root.left, a, b)
    const right = commonFatherNode(root.right, a, b)
    if(left === null && right === null) return null
    if(left === null) return right
    if(right === null) return left
    return root
}

let a = {
    val: 1,
    left: {
        val: 2
    },
    right: {
        val: 3
    }
}

console.log(distance(a, 3, 2))
```



**Lazada二面手写题目**

第一题

```js
// # 题目1 - 编写一个函数来查找字符串数组中的最长公共前缀
// 如果不存在公共前缀，返回空字符串 ""

// 1.递归+分值算法
// 2.前缀树

class TNode {
  isWord: boolean
  next: Map<string, TNode>

  constructor(isWord = false) {
    this.isWord = isWord
    this.next = new Map()
  }
}

class TrieTee {
  head: TNode

  constructor() {
    this.head = new TNode()
  }

  add(word) {
    let cur = this.head
    for (let i = 0; i < word.length; i++) {
      const element = word[i]
      if (!cur.next.has(element)) {
        cur.next.set(element, new TNode())
      }
      cur = cur.next.get(element)
    }
    cur.isWord = true
  }
}

function curLongestCommonPrefix(strs: string[]) {
  const tree = new TrieTee()
  strs.forEach(str => tree.add(str))

  // 计算公共前缀
  let cur = tree.head
  let result = ''
  while (cur) {
    if (cur.next.size > 1) break
    const ele = cur.next.keys().next().value
    result += ele
    cur = cur.next.get(ele)
  }

  return result
}

const arrs = ["flower", "flow", "flight"]
console.log(curLongestCommonPrefix(arrs)) // fl


// 解法 2 使用分制的思想  利用递归去实现

// 求解两个字符串的公共前缀
function prefixTwo(str1: string, str2: string) {
  let j = 0
  for (; j < str1.length && j < str1.length; j++) {
    if (str1.charCodeAt(j) !== str2.charCodeAt(j)) break
  }
  return str1.substring(0, j)
}

function getCommonPrefix(arr: string[]) {
  if (arr.length === 1) return arr[0]
  const mid = Math.floor(arr.length / 2)
  const leftSub = arr.slice(0, mid)
  const rightSub = arr.slice(mid, arr.length)
  return prefixTwo(getCommonPrefix(leftSub), getCommonPrefix(rightSub))
}

console.log(getCommonPrefix(arrs)) // fl

```



第二题

```js
// # 题目2 - 编写函数$，支持根据css selector获取dom节点，并且能够链式调用添加与删除classname.

function $(selector) {
// code here
}
```



第三题

```js
// # 题目3 - 实现事件处理器 EventEmitter
class EventEmitter {
}
```



**虾皮一面**

项目以及其他一些基础问题

redux源码相关

手写`ts`的`Pick`和`Omit`的实现

```tsx
type Pick = ?
type Omit = ?
```

手写：连续的最长子串。

```js
输入: s = "abcabcbb"
输出："abc"
解释: 因为无重复字符的最长子串是 "abc"
```



**虾皮二面**

项目以及一些基础问题

xhr和fetch的区别

axios的源码实现（拦截器、`cancelToken`机制）

手写仅有一道CSS问题，还很简单：

```js
// 实现两列布局，左侧固定200px，右侧自适应。
// 改变left、right位置，如何保持布局不变？
```



**字节一面（多媒体）**

除了`cookie`还有哪些有跨域的限制。（localStorage...）
es相关新特性
webSocket的握手过程
http缓存，强缓存、协商缓存
....其他基础问题....

手写：

1.宏任务和微任务输出的问题。

2.作用域链相关问题。

3.实现`柯里化函数`

4.实现数组扁平化、去重、排序





**字节二面（多媒体）**

跨域解决方案？

CORS请求和响应头都有哪些

react的hooks原理

useMemo、memo、useCallback、PureComponent区别

```js
自定义一个hook，赋初始值，在不渲染的情况下，每次都能拿到最新值。

// 使用
const [context, setContext] = myCtxState('hello')

setInterval(() => {
  context.value
}, 1000)
```

要点：

1.**不渲染**，意味着不能使用`useEffect`，要改变只能使用`setContext`更改

2.**有初始值**，意味着需要在hooks中区分是否初次渲染

3.**每次都是最新值**，只能是`ref`才能实现了

实现：

```jsx
const myCtxState = (initValue) => {
  const isInitRender = useRef(true)
  const ctxRef = useRef(null)
  
  if(isInitRender.current) { // 初始渲染
    isInitRender.current = false
    ctxRef.current = { value: initValue }
  }
  
  const setContext = useCallback((value) => {
    ctxRef.current = { value }
    }
  }, [])
  
  return [ctxRef.current, setContext]
}
```



**字节三面（多媒体）**

项目以及一些基础问题

http2.0新特性

.......想不起来了......

手写：实现二叉树的`S型`打印输出

```js
// 层级遍历 - S型遍历
function levelOrderS(root) {
  const result = []
  const queue = []
  let level = 0 // 层级
  queue.push(root)
  while (queue.length > 0) {
    level += 1 // 记录当前层级，奇数行逆序，偶数行正序
    const len = queue.length
    const levelElement = []
    for (let i = 0; i < len; i++) {
      const ele = queue.shift()
      if (level % 2 === 0) { // 偶数行
        levelElement.push(ele.val)
      } else { // 奇数行
        levelElement.unshift(ele.val)
      }
      if (ele.left) queue.push(ele.left)
      if (ele.right) queue.push(ele.right)
    }
    result.push(...levelElement)
  }

  return result.join('')
}

// test
const root = {
  val: 'A',
  left: { val: 'B', left: { val: 'D' }, right: { val: 'E' } },
  right: { val: 'C', left: { val: 'F' }, right: { val: 'G' } }
}

//    A
//   B C
//  DE FG

// ABCGFED

console.log(levelOrderS(root))
```


**面试结果：**
> 1.字节大力教育二面挂（第三道题是真的不会写）
> 2.Lazada三面挂（电话面试几乎就问了下项目，有点坑爹）
> 3.字节多媒体过
> 4.虾皮正在等待hr面