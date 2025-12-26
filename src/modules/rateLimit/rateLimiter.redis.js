import redis from "../../config/redis.js";

export async function increment(key, ttlSeconds) {
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, ttlSeconds);
  }

  return count;
}
