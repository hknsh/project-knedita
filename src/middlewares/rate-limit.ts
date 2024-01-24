import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redis from "clients/redis-client";
import logger from "helpers/logger";

let skip: boolean;

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  logger.info("Development environment detected. Rate limit is now disabled.");
  skip = true;
} else {
  skip = false;
}

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 60 seconds
  max: 5,
  message: { error: "Too many requests" },
  legacyHeaders: false,
  skip: (_req, _res) => skip,
  store: new RedisStore({
    sendCommand: async (...args: string[]) => await redis.sendCommand(args),
  }),
});

export default limiter;
