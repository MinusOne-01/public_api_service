import { buildCacheKey, getCachedResponse, cacheResponse } from "../modules/cache/cache.service.js";

export async function cacheMiddleware(req, res, next) {
    const key = buildCacheKey(req);

    const cached = await getCachedResponse(key);

    if (cached) {
        res.setHeader("X-Cache", "HIT");
        return res.json(cached);
    }

    // Intercept response
    const originalJson = res.json.bind(res);

    res.json = (body) => {
        const status = res.statusCode;

        if (status >= 200 && status < 300) {
            res.setHeader("X-Cache", "MISS");
            cacheResponse(key, body).catch(console.error);
        }

        return originalJson(body);
    };

    next();
}
