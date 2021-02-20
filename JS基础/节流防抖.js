// 防抖函数，多次执行小于wait值，转化为一次执行
function debounce(func, wait, immediate) {
  let context, args, timer;

  let later = function () {
    return setTimeout(() => {
      timer = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
  }

  return function (...params) {
    if (timer) {
      clearTimeout(timer);
      timer = later();
    } else {
      timer = later();
      if (immediate) {
        func.apply(this, params);
      } else {
        context = this;
        args = params;
      }
    }
  }

}

// 节流函数  多次执行，转化为每隔wait时间执行一次
function throttle(func, wait) {
  let timer = null;
  let context;
  return function (...params) {
    context = this;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, params);
      }, wait);
    }
  }
}