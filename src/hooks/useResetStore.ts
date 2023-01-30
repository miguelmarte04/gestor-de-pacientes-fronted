import { useEffect, useRef } from 'react'
import store from '../app/store'

/**
 * This hook resets the store to its initial state.
 */
function useResetStore(resetStore: boolean): void {
  const dispatch = store.dispatch
  const refState = useRef<boolean>()

  useEffect(() => {
    refState.current = resetStore
  }, [resetStore])

  const curRefState = refState.current

  useEffect(() => {
    if (curRefState) {
      dispatch({ type: 'RESET_STORE_STATE' })
    }
  }, [curRefState])

  refState.current = false
}

export default useResetStore
