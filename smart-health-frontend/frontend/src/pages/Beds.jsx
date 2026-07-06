import { useFetch } from "../api/useFetch";
import { endpoints } from "../api/endpoints";
import { Loading, ErrorState } from "../components/States";

export default function Beds() {
  const centers = useFetch(endpoints.healthCenters.list());

  if (centers.loading) return <Loading label="Loading..." />;

  if (centers.error)
    return (
      <ErrorState
        message={centers.error}
        onRetry={centers.reload}
      />
    );

  return (
    <div>
      <div className="page-header">
        <div>
          <span className="eyebrow">Capacity</span>
          <h1>Beds</h1>
        </div>
      </div>

      <div className="grid cols-2">
        {centers.data.map((center) => (
          <BedCard
            key={center.center_id}
            center={center}
          />
        ))}
      </div>
    </div>
  );
}

function BedCard({ center }) {
  const beds = useFetch(
    endpoints.beds.list(center.center_id)
  );

  if (beds.loading)
    return (
      <div className="card">
        Loading...
      </div>
    );

  if (beds.error)
    return (
      <div className="card">
        {beds.error}
      </div>
    );

  return (
    <div className="card">
      <h3>{center.name}</h3>

      <p>Total Beds: {beds.data.total_beds}</p>

      <p>
        Occupied: {beds.data.occupied_beds}
      </p>

      <p>
        Available: {beds.data.available_beds}
      </p>
    </div>
  );
}