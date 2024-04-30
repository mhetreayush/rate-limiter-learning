import {
  MAX_REQUESTS_PER_WINDOW,
  RATE_LIMIT_WINDOW_IN_SECONDS,
} from "@src/constants";

type RateLimitData = {
  count: number;
  lastRequestTime: number;
};

const rateLimitMap: Map<string, RateLimitData> = new Map();

export const getRateLimitData = (token: string): RateLimitData | undefined => {
  return rateLimitMap.get(token);
};

const createNewRateLimitData = (token: string) => {
  const rateLimitData: RateLimitData = {
    count: 1,
    lastRequestTime: Date.now(),
  };
  rateLimitMap.set(token, rateLimitData);
  return rateLimitData;
};

export const updateRateLimitData = (token: string): RateLimitData => {
  const rateLimitData = rateLimitMap.get(token);
  if (!rateLimitData) {
    return createNewRateLimitData(token);
  }
  const currentTime = Date.now();
  const timeBetweenRequests = currentTime - rateLimitData.lastRequestTime;
  if (timeBetweenRequests > RATE_LIMIT_WINDOW_IN_SECONDS * 1000) {
    rateLimitData.count = 1;
  } else {
    rateLimitData.count = rateLimitData.count + 1;
  }
  rateLimitData.lastRequestTime = currentTime;
  return rateLimitData;
};

export const checkRateLimit = (
  token: string
): {
  rateLimitData: RateLimitData;
  rateLimitedStatus: boolean;
} => {
  const rateLimitData = updateRateLimitData(token);
  const rateLimitedStatus = rateLimitData.count > MAX_REQUESTS_PER_WINDOW;
  return {
    rateLimitData,
    rateLimitedStatus,
  };
};
