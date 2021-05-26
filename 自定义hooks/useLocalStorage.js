const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key)
      if (savedValue) {
        return JSON.stringify(savedValue)
      }
    } catch (e) {
      console.log('useLocalStorage: ', e)
      return initialValue
    }
    return initialValue
  })

  // 用户写入数据
  const set = (inputValue) => {
    // 兼容输入为函数的情况
    const newValue = inputValue instanceof Function ? inputValue(value) : inputValue
    const parsedValue = JSON.stringify(newValue)
    localStorage.setItem(key, parsedValue)
    setValue(newValue)
  }

  return [value, set]
}

// 使用
const [flag, setFlag] = useLocalStorage('flag_key', { name: 'bjw', count: 0 })

console.log(flag)
setFlag({ name: 'hello' })
setFlag(prev => ({ ...prev, count: prev.count + 1 }))
