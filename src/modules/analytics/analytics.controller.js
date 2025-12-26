import { getAnalyticsSummary } from "../modules/analytics/analytics.service.js";

export async function analyticsController(req, res) {
  const summary = await getAnalyticsSummary();
  res.json(summary);
}
