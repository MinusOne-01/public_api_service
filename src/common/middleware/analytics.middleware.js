import { trackRequest } from "../../modules/analytics/analytics.service.js";

export function analyticsMiddleware(req, res, next) {
  console.log("Analytics middleware");
  
  res.on("finish", () => {

    if (req.apiKey) {
      console.log("Analytics added");
      trackRequest({
        apiKeyId: req.apiKey.id,
        method: req.method,
        path: req.route?.path || req.path,
        status: res.statusCode,
        cached: req.cacheStatus === "HIT",
      });
    }
  });

  next();

}