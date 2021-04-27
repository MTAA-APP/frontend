import { useState, useCallback } from 'react'

type ModalState<T> = {
  visible: boolean
  data: T
}

type UseModal<T> = {
  state: ModalState<T>
  show: (value?: T) => void
  hide: () => void
}

export default <Data>(
  initVisible: boolean = false,
  initData: Data = undefined!
): UseModal<Data> => {
  const [state, setState] = useState<ModalState<Data>>({
    visible: initVisible,
    data: initData,
  })

  const show = useCallback(
    (value?: Data) => setState({ visible: true, data: value || undefined! }),
    []
  )

  const hide = useCallback(
    () => setState({ visible: false, data: undefined! }),
    []
  )

  return { state, show, hide }
}
