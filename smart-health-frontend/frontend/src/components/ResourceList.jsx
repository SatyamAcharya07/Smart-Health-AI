import { useFetch } from '../api/useFetch'
import { Loading, ErrorState, EmptyState } from './States'

/**
 * Renders a fetched list via a render-prop, so each page only needs
 * to describe how a single row looks, not repeat loading/error/empty
 * handling every time.
 */
export default function ResourceList({ path, emptyTitle, emptyHint, renderRow, keyOf }) {
  const { data, loading, error, reload } = useFetch(path)
  const rows = Array.isArray(data) ? data : []

  if (loading) return <Loading />
  if (error) return <ErrorState message={error} onRetry={reload} />
  if (rows.length === 0) return <EmptyState title={emptyTitle} hint={emptyHint} />

  return (
    <div className="row-list">
      {rows.map((row, i) => (
        <div className="row-item" key={keyOf ? keyOf(row, i) : row.id ?? i}>
          {renderRow(row)}
        </div>
      ))}
    </div>
  )
}
