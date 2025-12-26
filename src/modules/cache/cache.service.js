import { getCache, setCache } from "./cache.redis.js";

const DEFAULT_TTL = 600; // seconds

function normalizeQuery(query) {
  return Object.keys(query)
    .sort()
    .map((k) => `${k}=${query[k]}`)
    .join("&");
}

export function buildCacheKey(req) {
  const apiKeyId = req.apiKey.id;
  const method = req.method;
  const path = req.route?.path || req.path;
  const query = normalizeQuery(req.query || {});

  return `cache:${apiKeyId}:${method}:${path}:${query}`;
}

export async function getCachedResponse(key) {
  return getCache(key);
}

export async function cacheResponse(key, data, ttl = DEFAULT_TTL) {
  await setCache(key, data, ttl);
}
