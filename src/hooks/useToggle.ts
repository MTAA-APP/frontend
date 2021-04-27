import { useState, useCallback } from 'react'

type UseToggle = {
  isVisible: boolean
  show: () => void
  hide: () => void
  toggle: () => void
}

export default (initialValue?: boolean): UseToggle => {
  const [isVisible, setIsVisible] = useState<boolean>(!!initialValue)

  const show = useCallback(() => setIsVisible(true), [initialValue])

  const hide = useCallback(() => setIsVisible(false), [initialValue])

  const toggle = useCallback(() => setIsVisible((prev) => !prev), [
    initialValue,
  ])

  return { isVisible, show, hide, toggle }
}
