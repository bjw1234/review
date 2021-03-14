let isMount = true;
// 表示正在处理哪个hook
let workInProgressHook = null;

const fiber = {
  stateNode: App,
  memoizedState: null, // 多个hooks形成的链表
}

function useState(initialState) {
  let hook;
  debugger
  if (isMount) {
    hook = { // 创建hook
      memoizedState: initialState,
      next: null, // 一个函数组件中可能有多个hook，这里用链表保存
      queue: {
        pending: null, // 指向一个环状链表
      }, // 用户要更新的值
    }
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }
    workInProgressHook = hook;
  } else {
    // 更新 - hook的链表已经存在
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }

  // 新的状态
  let baseState = hook.memoizedState;

  if (hook.queue.pending) { // 有更新的值，并且已经形成了一个环状的链表
    let firstUpdate = hook.queue.pending.next;
    do {
      const action = firstUpdate.action;
      if (typeof action === 'function') {
        baseState = action(baseState);
        firstUpdate = firstUpdate.next;
      }
    } while (firstUpdate !== hook.queue.pending.next); // 到末尾了

    hook.queue.pending = null;
  }

  hook.memoizedState = baseState;
  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function dispatchAction(queue, action) {
  const update = { // 环状链表
    action,
    next: null,
  }
  if (queue.pending === null) {
    update.next = update;
  } else { // 插入环状链表
    // u1 -> u0 -> u1
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;

  schedule();
}

function schedule() {
  workInProgressHook = fiber.memoizedState; // 复位
  // debugger
  const app = fiber.stateNode();
  isMount = false;
  return app;
}


function App() {
  const [num, updateNum] = useState(0);
  const [num1, updateNum1] = useState(10);
  console.log('isMount ? ', isMount);
  console.log('num', num);
  console.log('num1', num1);

  return {
    onClick() {
      updateNum((num) => num + 1);
    },
    onFocus() {
      updateNum1(num => num + 10);
    }
  }
}

window.app = schedule();
