import { useEffect, useState } from 'react'

function useSearch<T>(value: T, delay: number): T {
  const [searchValue, setSearchValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setSearchValue(value), delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return searchValue
}

export default useSearch
