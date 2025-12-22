import crypto from "crypto";

const API_KEY_PREFIX = "sk_live_";
const API_KEY_BYTES = 32; // 256-bit
const HASH_ALGORITHM = "sha256";

export function generateApiKey() {
  const random = crypto.randomBytes(API_KEY_BYTES).toString("hex");
  return `${API_KEY_PREFIX}${random}`;
}

export function hashApiKey(apiKey) {
  return crypto
    .createHash(HASH_ALGORITHM)
    .update(apiKey)
    .digest("hex");
}

export function verifyApiKey(rawKey, storedHash) {
  const rawHash = hashApiKey(rawKey);

  return crypto.timingSafeEqual(
    Buffer.from(rawHash, "hex"),
    Buffer.from(storedHash, "hex")
  );
}

