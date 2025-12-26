import { trackRequest } from "../modules/analytics/analytics.service.js";

export function analyticsMiddleware(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const cached = res.getHeader("X-Cache") === "HIT";

    if (req.apiKey) {
      trackRequest({
        apiKeyId: req.apiKey.id,
        method: req.method,
        path: req.route?.path || req.path,
        status: res.statusCode,
        cached,
      });
    }
  });

  next();
}