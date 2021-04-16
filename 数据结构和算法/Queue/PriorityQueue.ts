import BinaryHeap, { Comparable } from "../Heap/BinaryHeap";

interface Queue<E> {
  enqueue(E)
  dequeue(): E
  getFront(): E
  getSize(): number
  isEmpty(): boolean
}

// 优先队列 - 可以使用`堆`这种数据结构去实现
export default class PriorityQueue<E> implements Queue<E> {
  private heap: BinaryHeap<E>

  constructor(compare: Comparable<E>) {
    this.heap = new BinaryHeap<E>(compare)
  }

  // 入队
  enqueue(e: E) {
    this.heap.add(e)
  }

  // 出队
  dequeue() {
    return this.heap.extraTop()
  }

  getFront() {
    return this.heap.getTop()
  }

  getSize() {
    return this.heap.getSize()
  }

  isEmpty() {
    return this.heap.isEmpty()
  }

  getData() {
    return this.heap.getData();
  }
}

// 测试优先队列
interface person {
  name: string,
  age: number,
}

const queue = new PriorityQueue((a: person, b: person) => a.age <= b.age);

queue.enqueue({ name: 'tom', age: 22 })
queue.enqueue({ name: 'lilei', age: 10 })
queue.enqueue({ name: 'tom', age: 42 })

console.log('出队的数据 ==>')
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
