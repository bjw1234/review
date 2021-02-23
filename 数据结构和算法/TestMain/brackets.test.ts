/**
 * 使用栈判断括号是否正确匹配
 * [([{}])]、()[{}][]
 */
import Stack from '../Stack/LinkedListStack'

const validate = function (str: string): boolean {
  if (!str) throw new Error('params string is not null')
  const stack = new Stack<string>()
  const map = {
    '{': '}',
    '[': ']',
    '(': ')',
  }
  const val = str.split('').every(item => {
    debugger
    if (item === '{' || item === '[' || item === '(') {
      stack.push(item)
      return true
    } else {
      const val = stack.pop()
      console.log(val, item)
      return map[val] === item
    }
  });
  if (val && stack.isEmpty()) return true
  return false
}

console.log(validate('[([{}])]'))
