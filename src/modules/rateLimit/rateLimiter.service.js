import { increment } from "./rateLimiter.redis.js";
import { RATE_LIMITS } from "./rateLimiter.config.js";

function currentWindow() {
  const now = new Date();
  return now.toISOString().slice(0, 16); // minute-level
}

export async function checkRateLimit({ apiKeyId, tier }) {

  const limits = RATE_LIMITS[tier] || RATE_LIMITS.FREE;;
  const MAX_REQUESTS = limits.MAX_REQUESTS;
  const WINDOW_SECONDS = limits.WINDOW_SECONDS;

  const window = currentWindow();
  const redisKey = `rate:${apiKeyId}:${window}`;

  const count = await increment(redisKey, WINDOW_SECONDS);

  return {
    allowed: count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - count),
    limit: MAX_REQUESTS,
    resetIn: WINDOW_SECONDS,
  };
}

