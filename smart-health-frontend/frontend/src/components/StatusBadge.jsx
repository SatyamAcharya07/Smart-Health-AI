// Normalizes whatever status vocabulary the backend uses
// (e.g. "low", "critical", "ok", "out_of_stock") into one
// of three visual tiers, so new status strings don't break styling.
function tierFor(rawStatus = '') {
  const s = String(rawStatus).toLowerCase()
  if (/(critical|out|empty|full|danger|urgent)/.test(s)) return 'critical'
  if (/(low|warn|near|limited|moderate)/.test(s)) return 'warn'
  if (/(ok|good|available|healthy|normal|sufficient)/.test(s)) return 'good'
  return 'neutral'
}

export default function StatusBadge({ status }) {
  if (!status) return null
  const tier = tierFor(status)
  return (
    <span className={`badge ${tier}`}>
      <span className="dot" />
      {status}
    </span>
  )
}
