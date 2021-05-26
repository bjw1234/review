const useEventListener = (target, eventType, handler, options) => {
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const currentHandler = event => savedHandler.current(event)
    target.addEventListener(eventType, currentHandler, options)

    return () => {
      target.removeEventListener(eventType, currentHandler, options)
    }
  }, [target, eventType, options])
}

// 使用
useEventListener(document, 'click', e => {
  console.log(e.target)
})

