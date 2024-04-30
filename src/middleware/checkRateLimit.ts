import { RATE_LIMITED, UNAUTHORIZED } from "@src/constants/errors";
import { checkRateLimit } from "@src/lib/rateLimiter";
import { NextFunction } from "express";

export const checkRateLimitMiddleware = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: UNAUTHORIZED });
    }
    const { rateLimitedStatus: hasExceededRateLimit } = checkRateLimit(token);

    if (hasExceededRateLimit) {
      return res.status(429).json({ message: RATE_LIMITED });
    }
    next();
  } catch (error) {
    next(error);
  }
};
