import { useParams, Link } from "react-router-dom";
import { useFetch } from "../api/useFetch";
import { endpoints } from "../api/endpoints";
import { Loading, ErrorState } from "../components/States";

export default function HealthCenterDetail() {
  const { centerId } = useParams();

  const {
    data: center,
    loading,
    error,
    reload,
  } = useFetch(endpoints.healthCenters.detail(centerId));

  const beds = useFetch(endpoints.beds.list(centerId));
  const medicines = useFetch(endpoints.medicines.list(centerId));

  if (loading) return <Loading label="Loading Health Center..." />;

  if (error)
    return (
      <ErrorState
        message={error}
        onRetry={reload}
      />
    );

  return (
    <div>
      <Link
        to="/health-centers"
        className="link-back"
      >
        ← Back
      </Link>

      <div className="page-header">
        <div>
          <span className="eyebrow">
            Health Center
          </span>

          <h1>{center.name}</h1>

          <p className="page-sub">
            {center.address}
          </p>
        </div>
      </div>

      <div className="grid cols-2">

        <div className="card">
          <h2>Bed Information</h2>

          {beds.loading ? (
            <Loading />
          ) : beds.error ? (
            <ErrorState
              message={beds.error}
            />
          ) : (
            <>
              <p>
                Total Beds :
                <strong>
                  {" "}
                  {beds.data.total_beds}
                </strong>
              </p>

              <p>
                Occupied Beds :
                <strong>
                  {" "}
                  {beds.data.occupied_beds}
                </strong>
              </p>

              <p>
                Available Beds :
                <strong>
                  {" "}
                  {beds.data.available_beds}
                </strong>
              </p>
            </>
          )}
        </div>

        <div className="card">
          <h2>Medicines</h2>

          {medicines.loading ? (
            <Loading />
          ) : medicines.error ? (
            <ErrorState
              message={medicines.error}
            />
          ) : (
            <div className="row-list">
              {medicines.data.map((m) => (
                <div
                  className="row-item"
                  key={m.medicine_name}
                >
                  <div>
                    <div className="row-title">
                      {m.medicine_name}
                    </div>

                    <div className="row-meta">
                      Current :
                      {" "}
                      {m.current_stock}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}