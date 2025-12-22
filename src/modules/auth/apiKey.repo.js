import { prisma } from "../../lib/prisma.js";

export async function createApiKey({ keyHash, name }) {
  return prisma.apiKey.create({
    data: {
      keyHash,
      name,
    },
  });
}

export async function findApiKeyByHash(keyHash) {
  return prisma.apiKey.findUnique({
    where: { keyHash },
  });
}

export async function listApiKeys() {
  return prisma.apiKey.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function revokeApiKey(id) {
  return prisma.apiKey.update({
    where: { id },
    data: {
      isActive: false,
      revokedAt: new Date(),
    },
  });
}

