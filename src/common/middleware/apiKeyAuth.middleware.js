import { validateApiKey } from "../../modules/auth/apiKey.service.js";

export async function apiKeyAuthMiddleware(req, res, next) {
  try {
 
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Missing or invalid Authorization header",
      });
    }

    const rawKey = authHeader.slice("Bearer ".length).trim();

    const apiKey = await validateApiKey(rawKey);

    if (!apiKey) {
      return res.status(401).json({
        error: "Invalid or revoked API key",
      });
    }

    // Attach caller context
    req.apiKey = apiKey;

    next();
  } catch (err) {
    console.error("API key auth error:", err);
    res.status(500).json({ error: "Authentication failure" });
  }
}
