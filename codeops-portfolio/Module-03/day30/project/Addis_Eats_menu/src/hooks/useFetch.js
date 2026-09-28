import { useEffect, useState } from 'react'

const initialState = { data: null, loading: true, error: null }

export function useFetch(url) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const controller = new AbortController()

    setState((previous) => ({ ...previous, loading: true, error: null }))

    async function load() {
      try {
        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()

        if (controller.signal.aborted) return
        setState({ data, loading: false, error: null })
      } catch (error) {
        if (error.name === 'AbortError' || controller.signal.aborted) return
        setState({ data: null, loading: false, error: error.message })
      }
    }

    load()

    return () => controller.abort()
  }, [url])

  return state
}
