import { redis } from "../../config/redis";

export async function getCache(key) {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCache(key, value, ttlSeconds) {
  await redis.setEx(key, ttlSeconds, JSON.stringify(value));
}
