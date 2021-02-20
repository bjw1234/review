function clone(original) {
  if (!original || typeof original !== 'object') {
    throw new TypeError('params is not object type.');
  }
  const obj = original.constructor === Object ? {} : [];
  Object.getOwnPropertyNames(original).forEach(key => {
    const cur = original[key];
    if (typeof cur === 'object') {
      obj[key] = clone(cur);
    } else {
      obj[key] = cur;
    }
  });
  return obj;
}
