import { endpoints } from '../api/endpoints'
import ResourceList from '../components/ResourceList'
import StatusBadge from '../components/StatusBadge'

export default function Predictions() {
  return (
    <div>
      <div className="page-header">
        <div>
          <span className="eyebrow">Forecasting</span>
          <h1>Predictions</h1>
          <p className="page-sub">AI-generated stock and capacity forecasts.</p>
        </div>
      </div>

      <div className="card">
        <ResourceList
          path={endpoints.predictions.list()}
          emptyTitle="No predictions yet"
          emptyHint="Nothing has been generated so far."
          renderRow={(p) => (
            <>
              <div>
                <div className="row-title">{p.title ?? p.item_name ?? p.medicine_name ?? 'Prediction'}</div>
                <div className="row-meta">{p.center_name ?? p.center_id ?? ''}</div>
              </div>
              <StatusBadge status={p.status ?? p.result ?? p.prediction} />
            </>
          )}
        />
      </div>
    </div>
  )
}
