import { Request, Response, NextFunction } from "express";

type RateLimitEntry = {
  const: number;
  firstRequestAt: number; // timestamp
}

interface RateLimitirOptions {
  windowMs: number;
  limit: number;
}

export function rateLimiter(options: RateLimitirOptions) {
  const store = new Map<string, RateLimitEntry>();

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const now = Date.now();

    

    // const entry = store.get(ip);

    // // If no entry — create one
    // if (!entry) {
    //   store.set(ip, { count: 1, firstRequestAt: now });
    //   return next();
    // }

    // const { count, firstRequestAt } = entry;

    // // Check window expiration
    // if (now - firstRequestAt > options.windowMs) {
    //   // Reset window
    //   store.set(ip, { count: 1, firstRequestAt: now });
    //   return next();
    // }

    // // Window active ➜ check limit
    // if (count + 1 > options.limit) {
    //   const retryAfterSeconds = Math.ceil(
    //     (options.windowMs - (now - firstRequestAt)) / 1000
    //   );

    //   res.setHeader("Retry-After", retryAfterSeconds.toString());
    //   return res.status(429).json({
    //     message: "Too Many Requests",
    //   });
    // }

    // // Increase count
    // store.set(ip, {
    //   count: count + 1,
    //   firstRequestAt,
    // });

    next();
  };
}
