import { Request, Response, NextFunction } from "express";
import normalizeIp from "../utils/normalizeIp";
import { RateLimiterOptions } from "../models/RateLimiterOptions";
import { RateLimitEntry } from "../models/RateLimitEntry";

export function rateLimiter(options: RateLimiterOptions) {
  const store = new Map<string, RateLimitEntry>();

  return (req: Request, res: Response, next: NextFunction) => {
    const key = normalizeIp(req);
    const now = Date.now();

    if (!store.has(key)) {
      store.set(
        key,
        {
          count: 1,
          firstRequestAt: now
        }
      );

      req.rateLimit = {
        limit: options.limit - 1,
        resetAt: now + options.windowMs
      }

      return next();
    }

    const { count, firstRequestAt }: RateLimitEntry = store.get(key)!;

    // Check window
    if (now - firstRequestAt > options.windowMs) {
      store.set(key, { count: 1, firstRequestAt: now });

      req.rateLimit = {
        limit: options.limit - 1,
        resetAt: now + options.windowMs
      }

      return next();
    }

    // Check limit
    if (count + 1 > options.limit) {
      const retryAfterSeconds = Math.ceil(
        (options.windowMs - (now - firstRequestAt)) / 1000
      );

      res.setHeader("Retry-After", retryAfterSeconds.toString());

      return res.status(429).json({
        message: "Too Many Requests"
      });
    }

    // count + 1
    store.set(key, {
      count: count + 1,
      firstRequestAt
    });

    req.rateLimit = {
      limit: options.limit - (count + 1),
      resetAt: firstRequestAt + options.windowMs
    }

    next();
  };
}
