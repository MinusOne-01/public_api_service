import { increment } from "./rateLimiter.redis.js";

const WINDOW_SECONDS = 15;
const MAX_REQUESTS = 5;

function currentWindow() {
  const now = new Date();
  return now.toISOString().slice(0, 16); // minute-level
}

export async function checkRateLimit({ apiKeyId }) {
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

