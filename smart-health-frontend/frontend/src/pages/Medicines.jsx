import { Link } from "react-router-dom";
import { useFetch } from "../api/useFetch";
import { endpoints } from "../api/endpoints";
import { Loading, ErrorState, EmptyState } from "../components/States";

export default function Medicines() {
  const centers = useFetch(endpoints.healthCenters.list());

  if (centers.loading) return <Loading label="Loading health centers..." />;

  if (centers.error)
    return (
      <ErrorState
        message={centers.error}
        onRetry={centers.reload}
      />
    );

  if (!centers.data || centers.data.length === 0)
    return (
      <EmptyState
        title="No Health Centers"
        hint="No data found."
      />
    );

  return (
    <div>
      <div className="page-header">
        <div>
          <span className="eyebrow">Inventory</span>
          <h1>Medicines</h1>
          <p className="page-sub">
            Select a health center to view medicines.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="row-list">
          {centers.data.map((center) => (
            <Link
              key={center.center_id}
              to={`/health-centers/${center.center_id}`}
              className="row-item clickable"
            >
              <div>
                <div className="row-title">
                  {center.name}
                </div>

                <div className="row-meta">
                  {center.address}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}