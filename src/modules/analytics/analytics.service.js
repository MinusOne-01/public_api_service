import { createMetric, getSummaryMetrics } from "./analytics.repo.js";

export async function trackRequest({ apiKeyId, method, path, status, cached }) {
  // Fire-and-forget (do not block response)
  createMetric({
    apiKeyId,
    method,
    path,
    status,
    cached,
  }).catch(console.error);
}


export async function getAnalyticsSummary() {
  return getSummaryMetrics();
}
