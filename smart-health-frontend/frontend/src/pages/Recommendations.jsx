import { useFetch } from "../api/useFetch";
import { endpoints } from "../api/endpoints";
import { Loading, ErrorState, EmptyState } from "../components/States";

export default function Recommendations() {
  const {
    data,
    loading,
    error,
    reload,
  } = useFetch(endpoints.recommendations.list());

  if (loading)
    return <Loading />;

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
          <span className="eyebrow">
            AI
          </span>

          <h1>
            Recommendations
          </h1>
        </div>
      </div>

      <div className="card">
        <h2>
          AI Summary
        </h2>

        <p
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          {data.ai_summary}
        </p>
      </div>

      <div
        className="card"
        style={{
          marginTop: 20,
        }}
      >
        <h2>
          Suggested Transfers
        </h2>

        {data.recommendations.length === 0 ? (
          <EmptyState
            title="No Recommendations"
            hint="Everything looks good."
          />
        ) : (
          <div className="row-list">
            {data.recommendations.map(
              (r, i) => (
                <div
                  key={i}
                  className="row-item"
                >
                  <div>
                    <div className="row-title">
                      {r.medicine}
                    </div>

                    <div className="row-meta">
                      {r.from} → {r.to}
                    </div>
                  </div>

                  <strong>
                    {r.quantity}
                  </strong>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}