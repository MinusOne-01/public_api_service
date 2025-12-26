import { prisma } from "../../config/prisma.js";

export async function createMetric(data) {
  return prisma.apiMetric.create({
    data,
  });
}

export async function getSummaryMetrics() {
  const totalRequests = prisma.apiMetric.count();

  const cachedRequests = prisma.apiMetric.count({
    where: { cached: true },
  });

  const rateLimited = prisma.apiMetric.count({
    where: { status: 429 },
  });

  return {
    totalRequests: await totalRequests,
    cacheHitRatio:
      (await cachedRequests) / Math.max(await totalRequests, 1),
    rateLimited: await rateLimited,
  };
}