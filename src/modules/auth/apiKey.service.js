import { generateApiKey, hashApiKey } from "./apiKey.utils";
import { createApiKey, findApiKeyByHash, listApiKeys as listApiKeysRepo, revokeApiKey as revokeApiKeyRepo } from "./apiKey.repo.js";

export async function createNewApiKey({ name } = {}) {
  const rawKey = generateApiKey();
  const keyHash = hashApiKey(rawKey);

  const record = await createApiKey({
    keyHash,
    name,
  });

  return {
    id: record.id,
    name: record.name,
    apiKey: rawKey, // returned once
    createdAt: record.createdAt,
  };
}

export async function validateApiKey(rawKey) {
  if (!rawKey) {
    return null;
  }

  const keyHash = hashApiKey(rawKey);
  const apiKey = await findApiKeyByHash(keyHash);

  if (!apiKey) return null;
  if (!apiKey.isActive) return null;
  if (apiKey.revokedAt) return null;

  return {
    id: apiKey.id,
    name: apiKey.name,
    // tier: apiKey.tier (later)
  };
}

export async function listApiKeys() {
  const keys = await listApiKeysRepo();

  return keys.map((k) => ({
    id: k.id,
    name: k.name,
    isActive: k.isActive,
    createdAt: k.createdAt,
    revokedAt: k.revokedAt,
  }));
}

export async function revokeApiKey(id) {
  return revokeApiKeyRepo(id);
}