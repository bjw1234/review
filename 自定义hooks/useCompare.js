const useCompare = (obj, compare) => {
  const prevRef = useRef(obj)
  const isEqual = compare(obj, prevRef.current)
  useEffect(() => {
    if (!isEqual) {
      prevRef.current = obj
    }
  }, [obj])
  return isEqual ? prevRef.current : obj
}

// 使用
const bar = useCompare(obj, (prev) => prev && prev.id === obj.id)
