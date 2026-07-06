import { Link } from 'react-router-dom'
import { endpoints } from '../api/endpoints'
import ResourceList from '../components/ResourceList'
import StatusBadge from '../components/StatusBadge'

export default function HealthCenters() {
  return (
    <div>
      <div className="page-header">
        <div>
          <span className="eyebrow">Directory</span>
          <h1>Health centers</h1>
          <p className="page-sub">Every facility connected to the network.</p>
        </div>
      </div>

      <div className="card">
        <ResourceList
          path={endpoints.healthCenters.list()}
          emptyTitle="No health centers found"
          emptyHint="Check that the backend is running and reachable."
          keyOf={(c) => c.id ?? c.center_id}
          renderRow={(c) => (
            <Link
              to={`/health-centers/${c.id ?? c.center_id}`}
              style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
            >
              <div>
                <div className="row-title">{c.name ?? c.center_name ?? c.id}</div>
                <div className="row-meta">{c.location ?? c.address ?? ''}</div>
              </div>
              <StatusBadge status={c.status} />
            </Link>
          )}
        />
      </div>
    </div>
  )
}
