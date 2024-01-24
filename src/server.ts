import app from "./app";
import { createServer } from "http";
import logger from "helpers/logger";

import prisma from "clients/prisma-client";
import redis from "clients/redis-client";

const server = createServer(app);

server.listen(process.env.SERVER_PORT, () => {
  logger.info(`Server is running @ ${process.env.SERVER_PORT ?? ""}`);
});

process.on("SIGINT", async () => {
  logger.warn("Closing server...");
  await prisma.$disconnect();
  await redis.disconnect();
  server.close();
});
