import { checkRateLimit } from "../../modules/rateLimit/rateLimiter.service.js";

export async function rateLimitMiddleware(req, res, next) {
  try {
    const apiKey = req.apiKey;

    if (!apiKey) {
      return res.status(500).json({ error: "API key context missing" });
    }

    const result = await checkRateLimit({
      apiKeyId: apiKey.id,
    });

    if (!result.allowed) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        limit: result.limit,
        resetIn: result.resetIn,
      });
    }

    res.setHeader("X-RateLimit-Limit", result.limit);
    res.setHeader("X-RateLimit-Remaining", result.remaining);

    next();
  } catch (err) {
    console.error("Rate limit error:", err);
    res.status(500).json({ error: "Rate limiting failed" });
  }
}