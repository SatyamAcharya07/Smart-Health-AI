export function Loading({ label = 'Loading' }) {
  return (
    <div className="state-block">
      <span className="state-title">{label}</span>
      one moment&hellip;
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-block error">
      <span className="state-title">Couldn&rsquo;t load this</span>
      {message}
      {onRetry && (
        <div>
          <button className="retry-btn" onClick={onRetry}>
            Try again
          </button>
        </div>
      )}
    </div>
  )
}

export function EmptyState({ title = 'Nothing here yet', hint }) {
  return (
    <div className="state-block">
      <span className="state-title">{title}</span>
      {hint}
    </div>
  )
}
