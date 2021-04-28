function compose(...funcs) {
  if (funcs.length === 0) {
    return args => args;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((next, cur) => (...args) => next(cur(...args)));
}

function createThunkMiddleWare(args) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, args);
    }
    return next(action);
  }
}

const thunk = createThunkMiddleWare();

function applyMiddleWares(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = () => {
      throw Error('not allow dispatch in construct middleware period.');
    }

    // 增强 dispatch 方法
    const middleAPI = {
      // 这块非常关键
      // 1.避免在构建过程中被调用
      // 2.传递action对象，最终被 next(action) 执行
      dispatch: (...args) => dispatch(...args),
      getState: store.getState,
    };

    const chain = middlewares.map(ware => ware(middleAPI));
    // 改写dispatch 接收action，
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  }
}

function createStore(reducer, inititalState, enhancer) {
  let currentState = inititalState;
  let currentReducer = reducer;
  let currentEnhancer = enhancer;
  let listenerList = [];
  let isDispatching = false;
  if (typeof inititalState === 'function' && typeof enhancer === 'undefined') {
    currentState = {};
    currentEnhancer = inititalState;
  }

  if (currentEnhancer) {
    return enhancer(createStore)(reducer, inititalState);
  }

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    if (!action.type) {
      throw Error('is not standrad action.');
    }
    if (isDispatching) {
      throw Error('not allow dispatch in dispatch function.');
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
      listenerList.forEach(lis => lis(currentState));
    } finally {
      isDispatching = false;
    }
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw Error('listener not a funciton.')
    }
    const idx = listenerList.length;
    listenerList = [...listenerList, listener];

    return () => {
      listenerList.splice(idx, 1);
    }
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}

const reducer = (state, action) => {
  if (action.type === 'add') {
    state.count += 1;
  }
  if (action.type === 'sub') {
    state.count -= 1;
  }
  return state;
}

const enhancer = applyMiddleWares(thunk);

const myStore = createStore(reducer, { count: 0 }, enhancer);

myStore.dispatch((dispatch) => {
  console.log('something');
  dispatch({ type: 'add' });
});

console.log(myStore.getState()); // {count: 1}
