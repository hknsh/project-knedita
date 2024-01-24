import "dotenv/config";

import compression from "compression";
import cors from "cors";
import express from "express";
import limiter from "middlewares/rate-limit";
import morganMiddleware from "middlewares/morgan";
import router from "./routes";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "helpers/parse-swagger";
import swaggerConfig from "config/swagger";

const app = express();

// TODO: test socket io, emit notifications when create one.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);
app.options("*", cors());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT"],
    optionsSuccessStatus: 200,
  })
);
app.use(express.static("public"));
app.use(limiter);
app.use(router);
app.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, swaggerConfig)
);
app.use(compression({ level: 9 }));

app.get("/", (_req, res) => {
  res.redirect("/docs");
});

app.use((_req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
  });
});

export default app;
