import { useEffect } from "react"

export default function useWindowEvent<E extends keyof WindowEventMap>(
  event: E,
  handler: (event: WindowEventMap[E]) => void,
  options?: boolean | AddEventListenerOptions | undefined,
) {
  useEffect(() => {
    window.addEventListener(event, handler, options)
    return () => window.removeEventListener(event, handler)
  }, [event, handler, options])
}
