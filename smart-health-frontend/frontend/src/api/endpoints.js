/**
 * Every path the frontend calls, in one place.
 *
 * Confirmed against your backend:
 *   GET /{center_id}   on the health_centers router  -> single health center
 *
 * Everything else below is a best-guess REST convention matching that
 * pattern (list endpoint at the router root, detail at /{id}, scoped
 * sub-resources filtered by center_id). If your actual routes differ,
 * this is the only file that needs to change — every page imports
 * from here rather than hardcoding a URL.
 */
export const endpoints = {
  dashboard: {
    summary: () => "/dashboard",
  },

  healthCenters: {
    list: () => "/health-centers",
    detail: (centerId) => `/health-centers/${centerId}`,
  },

  beds: {
  list: (centerId) => `/health-centers/${centerId}/beds`,
},

  medicines: {
  list: (centerId) =>
    `/health-centers/${centerId}/medicines`,
},
  recommendations: {
    list: () => "/recommendations",
  },
};