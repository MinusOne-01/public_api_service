import { buildCacheKey, getCachedResponse, cacheResponse } from "../../modules/cache/cache.service.js";

export async function cacheMiddleware(req, res, next) {

    const key = buildCacheKey(req);
    console.log("Key-> ", key);
    const cached = await getCachedResponse(key);

    if (cached) {
        req.cacheStatus = "HIT";    
        res.setHeader("X-Cache", "HIT");
        console.log("Cache found-> ", cached);
        return res.json(cached);
    }

    console.log("Cache not found...");

    // Intercept response
    const originalJson = res.json.bind(res);

    res.json = (body) => {
        const status = res.statusCode;
        console.log("body->", body);

        if (status >= 200 && status < 300) {
            res.setHeader("X-Cache", "MISS");
            cacheResponse(key, body).catch(console.error);
        }

        return originalJson(body);
    };

    next();
}
