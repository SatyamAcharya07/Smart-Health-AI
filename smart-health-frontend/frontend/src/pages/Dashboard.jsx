import { useFetch } from "../api/useFetch";
import { endpoints } from "../api/endpoints";
import { Loading, ErrorState, EmptyState } from "../components/States";

function StatCard({ label, value }) {
  return (
    <div className="card stat-card">
      <p className="stat-label">{label}</p>
      <div className="stat-value">{value ?? "—"}</div>
    </div>
  );
}

export default function Dashboard() {
  const { data, loading, error, reload } = useFetch(
    endpoints.dashboard.summary()
  );

  if (loading) return <Loading label="Loading dashboard..." />;

  if (error)
    return (
      <ErrorState
        message={error}
        onRetry={reload}
      />
    );

  return (
    <div>
      <div className="page-header">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Smart Health AI</h1>
          <p className="page-sub">
            District Health Monitoring Dashboard
          </p>
        </div>
      </div>

      <div className="grid cols-4">
        <StatCard
          label="Health Centers"
          value={data.total_health_centers}
        />

        <StatCard
          label="Medicines"
          value={data.total_medicines}
        />

        <StatCard
          label="Available Beds"
          value={data.available_beds}
        />

        <StatCard
          label="Critical Alerts"
          value={data.critical_alerts}
        />
      </div>

      <div
        className="grid cols-2"
        style={{ marginTop: 20 }}
      >
        <div className="card">
          <h2>Recommendations</h2>

          {data.recommendations.length === 0 ? (
            <EmptyState
              title="No Recommendations"
              hint="Everything looks good."
            />
          ) : (
            <div className="row-list">
              {data.recommendations.map((r, i) => (
                <div
                  className="row-item"
                  key={i}
                >
                  <div>
                    <div className="row-title">
                      {r.medicine}
                    </div>

                    <div className="row-meta">
                      {r.from} → {r.to}
                    </div>
                  </div>

                  <strong>{r.quantity}</strong>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h2>AI Summary</h2>

          <p
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.8,
            }}
          >
            {data.ai_summary}
          </p>
        </div>
      </div>
    </div>
  );
}