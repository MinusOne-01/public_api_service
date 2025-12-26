import { apiKeyAuthMiddleware } from "../apiKeyAuth.middleware.js";
import { rateLimitMiddleware } from "../rateLimit.middleware.js";
import { cacheMiddleware } from "../cache.middleware.js";
import { analyticsMiddleware } from "../analytics.middleware.js";

export function publicApiPipeline() {
  return [
    apiKeyAuthMiddleware,
    analyticsMiddleware,
    rateLimitMiddleware,
    cacheMiddleware,
  ];
}
