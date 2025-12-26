import redis from "../../config/redis.js";

export async function getCache(key) {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCache(key, value, ttlSeconds) {
  await redis.setex(key, ttlSeconds, JSON.stringify(value));
  console.log("New Cache set up!");
}
