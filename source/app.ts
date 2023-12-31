import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "config";

import Logger from "./clients/logger";
import { postMiddlewares, preMiddlewares } from "./middlewares";
import api from "./api/router";
import { setupSocketConnection } from "./sockets/setup.socket";
import swaggerDocs from "./clients/swagger";

async function main() {
  const app = express();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: config.get("deploy.frontendUrl"),
      methods: ["GET", "POST"],
    },
  });

  app.use(cors({ credentials: true, origin: config.get("deploy.frontendUrl") }));

  app.use(express.json());
  app.use(cookieParser());

  app.use(preMiddlewares());

  app.use("/api", api);

  setupSocketConnection(io);
  app.set("io", io);

  app.use(postMiddlewares());

  server.listen(config.get("deploy.port"));
  Logger.instance.info("\\|/ Sakura API is ready \\|/");

  swaggerDocs(app, config.get("deploy.port"));
}

main();
