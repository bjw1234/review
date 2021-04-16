"use strict";
exports.__esModule = true;
var BinaryHeap_1 = require("../Heap/BinaryHeap");
// 优先队列 - 可以使用`堆`这种数据结构去实现
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue(compare) {
        this.heap = new BinaryHeap_1["default"](compare);
    }
    // 入队
    PriorityQueue.prototype.enqueue = function (e) {
        this.heap.add(e);
    };
    // 出队
    PriorityQueue.prototype.dequeue = function () {
        return this.heap.extraTop();
    };
    PriorityQueue.prototype.getFront = function () {
        return this.heap.getTop();
    };
    PriorityQueue.prototype.getSize = function () {
        return this.heap.getSize();
    };
    PriorityQueue.prototype.isEmpty = function () {
        return this.heap.isEmpty();
    };
    PriorityQueue.prototype.getData = function () {
        return this.heap.getData();
    };
    return PriorityQueue;
}());
exports["default"] = PriorityQueue;
var queue = new PriorityQueue(function (a, b) { return a.age <= b.age; });
queue.enqueue({ name: 'tom', age: 22 });
queue.enqueue({ name: 'lilei', age: 10 });
queue.enqueue({ name: 'tom', age: 42 });
console.log('出队的数据 ==>');
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
