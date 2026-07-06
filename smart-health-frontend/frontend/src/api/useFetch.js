import { useEffect, useState, useCallback } from 'react'
import client from './client'

// Backends vary in whether a list endpoint returns a bare array,
// or wraps it as { data: [...] } / { items: [...] }. This unwraps
// either shape so pages don't need to guess.
function unwrap(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.items)) return payload.items
  return payload
}

export function useFetch(path, { skip = false } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(!skip)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => setReloadKey((k) => k + 1), [])

  useEffect(() => {
    if (skip || !path) {
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)

    client
      .get(path)
      .then((res) => {
        if (!cancelled) setData(unwrap(res.data))
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err.response
              ? `Backend responded with ${err.response.status} for ${path}`
              : `Could not reach the backend at ${path}. Is the API running?`
          )
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [path, skip, reloadKey])

  return { data, loading, error, reload }
}
